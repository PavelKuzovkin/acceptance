package org.providcy.acceptance.dto.in;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AreaBoxDTO {
    private Double height;
    private Double left;
    private Double top;
    private Double width;
}


