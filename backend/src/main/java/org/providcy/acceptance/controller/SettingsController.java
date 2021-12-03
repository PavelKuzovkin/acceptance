package org.providcy.acceptance.controller;

import lombok.RequiredArgsConstructor;
import org.providcy.acceptance.model.Invoice;
import org.providcy.acceptance.model.Settings;
import org.providcy.acceptance.service.SettingsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final SettingsService service;

    @GetMapping("/{id}")
    public ResponseEntity<Settings> get(@PathVariable long id) {
        return service.findById(1L).map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Settings> update(@PathVariable long id, @RequestBody Settings dto) {
        return ResponseEntity.ok(service.update(1L, dto));
    }
}
