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
@Table(name = "settings")
public class Settings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean stopOnIncident;
    private int cleanPercent;
    private int partialPercent;
    private int badPercent;
    private int quantityAlarm;
}
