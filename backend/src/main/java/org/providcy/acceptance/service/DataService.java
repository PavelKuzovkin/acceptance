package org.providcy.acceptance.service;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.providcy.acceptance.dto.in.ErrorInDTO;
import org.providcy.acceptance.dto.in.NumberInDTO;
import org.providcy.acceptance.model.Incident;
import org.providcy.acceptance.model.Invoice;
import org.providcy.acceptance.model.type.InvoiceState;
import org.providcy.acceptance.repository.IncidentRepository;
import org.providcy.acceptance.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DataService {

    private final InvoiceRepository invoiceRepository;
    private final IncidentRepository incidentRepository;
    private Integer currentErrors = 0;

    @Value("${img-save-path}")
    private String imgSavePath;


    public void setNumber(NumberInDTO dto) {
        Optional<Invoice> optional = invoiceRepository.findLastByDeviceId(dto.getDeviceId());

        if (optional.isPresent()) {
            Invoice data = optional.get();
            data.setUnloadingEnd(Instant.now());

            InvoiceState state;
            if (data.getUnloadingError() == 0)
                state = InvoiceState.ACCEPTED;
            else if (data.getUnloadingError() > 20)
                state = InvoiceState.REJECTED;
            else
                state = InvoiceState.PARTLY_ACCEPTED;

            data.setState(state);

            invoiceRepository.save(data);
        }

        if (dto.getNumber() != null && !dto.getNumber().isEmpty()) {
            Invoice data = new Invoice();
            data.setDeviceId(dto.getDeviceId());
            data.setCreatedAt(Instant.now());
            data.setUnloadingStart(Instant.now());
            data.setWagonNumber(dto.getNumber());
            data.setState(InvoiceState.UNLOAD);

            invoiceRepository.save(data);
        }

        this.currentErrors = 0;
    }

    public void saveError(ErrorInDTO dto) {
        Optional<Invoice> optional = invoiceRepository.findLastByDeviceId(dto.getDeviceId());
        Invoice invoice = null;

        if (optional.isPresent()) {
            invoice = optional.get();
            invoice.setUnloadingError(invoice.getUnloadingError() + dto.getPredictions().length);
            invoiceRepository.save(invoice);
        }

        Incident incident = new Incident();
        incident.setId(null);
        incident.setCreatedAt(Instant.now());
        incident.setInvoice(invoice);
        incident.setErrorsQuantity(dto.getPredictions().length);
        incident.setErrorsDescribe("");
        incident = incidentRepository.save(incident);

        String fileName = "incident_" + incident.getId() + ".png";
        incident.setFileName(fileName);
        incidentRepository.save(incident);

        if (imgSavePath != null && !imgSavePath.isEmpty()) {
            try {
                File newFile = new File(imgSavePath + fileName);
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(newFile));
                stream.write(Base64.decodeBase64(dto.getBase64dataUrl().split(",")[1]));
                stream.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        this.currentErrors = dto.getPredictions().length;
    }

    public Integer getCurrentErrors() {
        return this.currentErrors;
    }
}
