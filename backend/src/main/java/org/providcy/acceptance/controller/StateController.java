package org.providcy.acceptance.controller;

import lombok.RequiredArgsConstructor;
import org.providcy.acceptance.service.DataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/state")
@RequiredArgsConstructor
public class StateController {

    private final DataService service;

    @GetMapping
    public ResponseEntity<Integer> currentErrors() {
        return ResponseEntity.ok(service.getCurrentErrors());
    }
}
