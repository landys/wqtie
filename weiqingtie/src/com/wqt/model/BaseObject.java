package com.wqt.model;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * Base class for Model objects. This is basically for the toString, equals and
 * hashCode methods.
 * 
 * @author Jinde
 * @since 2013-10-7
 */
public class BaseObject {

    /**
     * toString method.
     * 
     * @return string
     */
    public String toString() {
        return ToStringBuilder.reflectionToString(this,
                ToStringStyle.MULTI_LINE_STYLE);
    }

    /**
     * overwrite equals method.
     * 
     * @param o
     *            the object to be compared
     * @return true if objects are equals, false otherwise.
     */
    public boolean equals(Object o) {
        return EqualsBuilder.reflectionEquals(this, o);
    }

    /**
     * overwrite hashCode method.
     * 
     * @return the hash code
     */
    public int hashCode() {
        return HashCodeBuilder.reflectionHashCode(this);
    }
}
