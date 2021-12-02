package org.providcy.acceptance.pagination;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

@Data
public class PagerResponse<T> {

    private Pager pager;
    private List<T> list;
    private Map<String, String> moreOptions;

    public PagerResponse() {
    }

    public PagerResponse(Page<T> page) {
        this.pager = new Pager(page);
        this.list = page.getContent();
    }

    public PagerResponse(Page<T> page, Map<String, String> moreOptions) {
        this.pager = new Pager(page);
        this.list = page.getContent();
        this.moreOptions = moreOptions;
    }
}
