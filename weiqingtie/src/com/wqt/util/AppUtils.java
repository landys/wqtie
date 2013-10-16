package com.wqt.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;

/**
 * @author Jinde
 * 
 */
public class AppUtils {
	
	private static SimpleDateFormat onlyDateFormat = new SimpleDateFormat("yyyy-MM-dd");
	
	private static final Logger LOG = Logger.getLogger(AppUtils.class);

	public static boolean checkEmptyString(final String str) {
		return (str == null || str.trim().length() == 0);
	}
	
	/**
	 * "2013-11-24"
	 * @param date
	 * @return
	 */
	public static String dateToSimpleString(final Date date) {
		if (date == null) return null;
		
		return onlyDateFormat.format(date);
	}
	
	public static Date simpleStringToDate(final String strDate) {
		try {
			return onlyDateFormat.parse(strDate);
		}
		catch (ParseException e) {
			LOG.error(e.getMessage());
		}
		
		return null;
	}
}
