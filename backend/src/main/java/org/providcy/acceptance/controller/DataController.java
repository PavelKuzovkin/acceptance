package org.providcy.acceptance.controller;

import lombok.RequiredArgsConstructor;
import org.providcy.acceptance.dto.in.ErrorInDTO;
import org.providcy.acceptance.dto.in.NumberInDTO;
import org.providcy.acceptance.service.DataService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/data")
@RequiredArgsConstructor
public class DataController {

    private final DataService service;

    @PostMapping("/number")
    public ResponseEntity getNumber(@RequestBody NumberInDTO dto) {
        System.out.println(dto.getNumber());
        service.setNumber(dto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/detect")
    public ResponseEntity getDetect(@RequestBody ErrorInDTO dto) {
        System.out.println(dto);
        service.saveError(dto);
        return new ResponseEntity(HttpStatus.OK);
    }
}
