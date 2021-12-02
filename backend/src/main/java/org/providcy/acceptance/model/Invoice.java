package org.providcy.acceptance.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.providcy.acceptance.model.type.InvoiceState;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String invoiceNumber;
    private Instant createdAt;
    private String wagonNumber;
    private Instant unloadingStart;
    private boolean unloadingError = false;
    private int weightBefore = 0;
    private int weightAfter = 0;
    private int weightCargo = 0;
    private int weightAccepted = 0;

    private String unloadingRecord;

    @Enumerated(EnumType.STRING)
    private InvoiceState state = InvoiceState.NONE;
}
