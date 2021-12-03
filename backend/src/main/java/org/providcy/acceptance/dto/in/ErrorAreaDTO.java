package org.providcy.acceptance.dto.in;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ErrorAreaDTO {
    private AreaBoxDTO box;
    private String label;
    private Double score;
}


