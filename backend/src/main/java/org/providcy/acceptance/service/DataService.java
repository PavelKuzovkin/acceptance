package org.providcy.acceptance.service;

import lombok.RequiredArgsConstructor;
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
    private String currentNumber;

    public void setNumber(NumberInDTO dto) {
        Optional<Invoice> optional = repository.findByWagonNumber(dto.getNumber());

        Invoice data;
        if (optional.isEmpty()) {
            data = new Invoice();
            data.setCreatedAt(Instant.now());
            data.setWagonNumber(dto.getNumber());
        } else {
            data = optional.get();
        }

        data.setUnloadingStart(Instant.now());
        data.setState(InvoiceState.UNLOAD);
        repository.save(data);

        this.currentNumber = dto.getNumber();
    }

    public void saveError(String dto) {
        Optional<Invoice> optional = repository.findByWagonNumber(this.currentNumber);

        if (optional.isPresent()) {
            Invoice data = optional.get();
            data.setUnloadingError(true);
            repository.save(data);
        }
    }

}
