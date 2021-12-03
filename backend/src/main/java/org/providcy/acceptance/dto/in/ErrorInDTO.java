package org.providcy.acceptance.dto.in;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ErrorInDTO {
    private ErrorAreaDTO predictions[];
    private String base64dataUrl;
    private int deviceId = 1;
}


