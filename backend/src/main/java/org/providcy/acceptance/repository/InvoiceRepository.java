package org.providcy.acceptance.repository;


import org.providcy.acceptance.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long>, JpaSpecificationExecutor<Invoice> {
    Optional<Invoice> findByWagonNumber(String number);

    @Query(value =
            "select * from invoices " +
                    "where device_id = ?1 and state in ('NONE', 'UNLOAD') " +
                    "order by unloading_start desc limit 1",
            nativeQuery = true)
    Optional<Invoice> findLastByDeviceId(long deviceId);
}
