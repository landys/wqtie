package com.wqt.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

/**
 * This class is an implementation of {@link Filter filter} to distinguish
 * requests from wap.hozom.com and requests from www.hozom.com. Because the
 * default homepages of wap and www are different.
 * 
 * @author James
 * 
 */
public final class AppUrlFilter implements Filter {

    /**
     * {@inheritDoc}
     */
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String url = httpRequest.getRequestURL().toString();
        RequestDispatcher dispatcher = null;
        String urlLowerCase = url.toLowerCase();
        if ((urlLowerCase.startsWith("http://m.vqingtie.") || urlLowerCase.startsWith("http://wap.vqingtie."))
                && (urlLowerCase.trim().endsWith(".wml") || urlLowerCase.trim().endsWith(".jsp")
                        || urlLowerCase.trim().endsWith("/"))) {
            dispatcher = request.getRequestDispatcher("/wap"
                    + httpRequest.getRequestURI());
            dispatcher.forward(request, response);
        }  else {
            chain.doFilter(request, response);
        }
    }

    /**
     * {@inheritDoc}
     */
    public void init(FilterConfig arg0) throws ServletException {
        // EMPTY
    }

    /**
     * 
     * @see javax.servlet.Filter#destroy()
     */
    public void destroy() {
        // EMPTY
    }
}