package org.providcy.acceptance.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "incidents")
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant createdAt;

    @ManyToOne
    @JoinColumn(name = "invoiceId")
    private Invoice invoice;

    private int errorsQuantity;
    private String errorsDescribe;
    private String fileName;
}
