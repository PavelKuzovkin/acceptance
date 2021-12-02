package org.providcy.acceptance.pagination;

import lombok.Data;
import org.springframework.data.domain.Page;

@Data
public class Pager {

    private int currentPage;
    private int end;
    private boolean hasNextPage;
    private boolean hasPreviousPage;
    private int maxPerPage;
    private int nbPages;
    private long nbResult;
    private long start;

    public Pager() {
    }

    public <T> Pager(Page<T> page) {
        this.currentPage = page.getNumber() + 1;
        this.end = page.getNumberOfElements();
        this.hasNextPage = page.hasNext();
        this.hasPreviousPage = page.hasPrevious();
        this.maxPerPage = page.getSize();
        this.nbPages = page.getTotalPages();
        this.nbResult = page.getTotalElements();
        this.start = !page.isEmpty() ? page.getPageable().getOffset() : 0;
    }
}
