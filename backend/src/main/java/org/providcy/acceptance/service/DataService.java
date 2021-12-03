package org.providcy.acceptance.service;

import lombok.RequiredArgsConstructor;
import org.providcy.acceptance.dto.in.ErrorInDTO;
import org.providcy.acceptance.dto.in.NumberInDTO;
import org.providcy.acceptance.model.Invoice;
import org.providcy.acceptance.model.type.InvoiceState;
import org.providcy.acceptance.repository.InvoiceRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DataService {

    private final InvoiceRepository repository;

    public void setNumber(NumberInDTO dto) {
        Optional<Invoice> optional = repository.findLastByDeviceId(dto.getDeviceId());

        System.out.println("============ 1");

        if (optional.isPresent()) {
            System.out.println("============ 2");
            Invoice data = optional.get();
            System.out.println(data);
            data.setUnloadingEnd(Instant.now());

            InvoiceState state;
            if (data.getUnloadingError() == 0)
                state = InvoiceState.ACCEPTED;
            else if (data.getUnloadingError() > 20)
                state = InvoiceState.REJECTED;
            else
                state = InvoiceState.PARTLY_ACCEPTED;

            data.setState(state);

            repository.save(data);
        }

        Invoice data = new Invoice();
        data.setDeviceId(dto.getDeviceId());
        data.setCreatedAt(Instant.now());
        data.setUnloadingStart(Instant.now());
        data.setWagonNumber(dto.getNumber());
        data.setState(InvoiceState.UNLOAD);

        repository.save(data);
    }

    public void saveError(ErrorInDTO dto) {
        Optional<Invoice> optional = repository.findLastByDeviceId(dto.getDeviceId());

        if (optional.isPresent()) {
            Invoice data = optional.get();
            data.setUnloadingError(data.getUnloadingError() + dto.getPredictions().length);
            repository.save(data);
        }
    }

}
