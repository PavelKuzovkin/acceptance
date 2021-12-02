package org.providcy.acceptance.pagination;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public class Pagination {

    public static <T> PagerResponse<T> of(Page<T> page) {
        return new PagerResponse<>(page);
    }

    public static <T> PagerResponse<T> of(Page<T> page, Map<String, String> moreOptions) {
        return new PagerResponse<>(page, moreOptions);
    }

    public <T> PagerResponse<T> of(List<T> list, Pageable pageable) {
        int maxPerPage = getMaxPerPage(pageable.getPageSize());

        int s = getPageIndex(pageable.getPageNumber()) * maxPerPage;
        int e = Math.min(s + maxPerPage, list.size());

        List<T> sublist = list.subList(s, e);
        Page<T> pages = new PageImpl<>(sublist, pageable, list.size());

        return new PagerResponse<>(pages);
    }

    private int getPageIndex(int page) {
        return Math.max(page - 1, 0);
    }

    private int getMaxPerPage(int perPage) {
        return Math.max(perPage, 10);
    }
}
