package com.wqt.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

/**
 * @author Jinde
 * 
 */
public class AppUtils {
	
	private static SimpleDateFormat onlyDateFormat = new SimpleDateFormat("yyyy-MM-dd");
	
	public static final boolean DebugMode = true;
	public static final String AssetSitePrefix = "images/";//"http://weiqingtie.u.qiniudn.com/";
	
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
		catch (Exception e) {
			LOG.error(e.getMessage());
		}
		
		return null;
	}
	
	public static String getWebSiteUrl(final HttpServletRequest request) {
		if (request == null) return null;
		
		final StringBuilder sb = new StringBuilder("http://");
		sb.append(request.getServerName());
		
		final int port = request.getServerPort();
		if (port != 80) {
			sb.append(":").append(port);
		}
		
		sb.append(request.getContextPath());
		
		if (sb.charAt(sb.length() - 1) != '/') {
			sb.append('/');
		}
		
		return sb.toString();
	}
}
