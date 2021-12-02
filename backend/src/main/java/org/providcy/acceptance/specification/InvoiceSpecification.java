package org.providcy.acceptance.specification;

import lombok.*;
import org.providcy.acceptance.dto.search.InvoiceSearchDTO;
import org.providcy.acceptance.model.Invoice;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceSpecification implements Specification<Invoice> {

    private InvoiceSearchDTO search;

    @SneakyThrows
    @Override
    public Predicate toPredicate(Root<Invoice> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {

        final List<Predicate> predicates = new ArrayList<>();




        return cb.and(predicates.toArray(new Predicate[predicates.size()]));
    }
}
