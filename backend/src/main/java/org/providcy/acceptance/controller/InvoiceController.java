package org.providcy.acceptance.controller;

import lombok.RequiredArgsConstructor;
import org.providcy.acceptance.dto.search.InvoiceSearchDTO;
import org.providcy.acceptance.model.type.InvoiceState;
import org.providcy.acceptance.pagination.PagerResponse;
import org.providcy.acceptance.model.Invoice;
import org.providcy.acceptance.pagination.Pagination;
import org.providcy.acceptance.service.InvoiceService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/v1/invoice")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService service;

    @GetMapping
    public ResponseEntity<PagerResponse<Invoice>> findAll(
            InvoiceSearchDTO searchDTO,
            @PageableDefault(sort = {"createdAt"}, direction = Sort.Direction.DESC) final Pageable pageable
    ) {

        return ResponseEntity.ok(Pagination.of(service.findAll(pageable, searchDTO)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> get(@PathVariable long id) {
        Optional<Invoice> optional = service.findById(id);
        return optional.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Invoice> create(@RequestBody Invoice dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Invoice> update(@PathVariable long id, @RequestBody Invoice dto) {
        Invoice data = service.update(id, dto);

        if (data == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else
            return ResponseEntity.ok(data);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable long id) {
        service.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/type")
    public List<InvoiceState> type() {
        return Arrays.stream(InvoiceState.values())
                .filter(item -> item != InvoiceState.NONE)
                .collect(Collectors.toList());
    }

}
