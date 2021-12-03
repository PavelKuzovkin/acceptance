package org.providcy.acceptance.service;

import lombok.RequiredArgsConstructor;
import org.providcy.acceptance.dto.search.InvoiceSearchDTO;
import org.providcy.acceptance.model.Invoice;
import org.providcy.acceptance.model.type.InvoiceState;
import org.providcy.acceptance.repository.InvoiceRepository;
import org.providcy.acceptance.specification.InvoiceSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository repository;

    public Page<Invoice> findAll(Pageable pageable, InvoiceSearchDTO searchDTO) {
        Specification<Invoice> specification = new InvoiceSpecification(searchDTO);
        return repository.findAll(specification, pageable);
    }

    public Optional<Invoice> findById(long id) {
        return repository.findById(id);
    }

    public void delete(long id) {
        repository.deleteById(id);
    }

    public Invoice create(Invoice dto) {
        dto.setId(null);
        dto.setCreatedAt(Instant.now());
        return repository.save(dto);
    }

    public Invoice update(long id, Invoice dto) {
        Optional<Invoice> optional = this.findById(id);
        if (optional.isEmpty())
            return null;

        Invoice data = optional.get();
        data.setWagonNumber(dto.getWagonNumber());
        data.setWeightBefore(dto.getWeightBefore());
        data.setWeightAfter(dto.getWeightAfter());

        data.setState(dto.getState());

        System.out.println(dto.getState());

        data.setWeightCargo(dto.getWeightBefore() - dto.getWeightAfter());

        if (dto.getState() == InvoiceState.ACCEPTED) {
            data.setWeightAccepted(data.getWeightCargo());
        } else if (dto.getState() == InvoiceState.PARTLY_ACCEPTED) {
            data.setWeightAccepted(dto.getWeightAccepted());
        } else if (dto.getState() == InvoiceState.REJECTED) {
            data.setWeightAccepted(0);
        } else {
            data.setWeightCargo(0);
            data.setWeightAccepted(0);
        }

        data.setUnloadingRecord(dto.getUnloadingRecord());

        return repository.save(data);
    }


}
