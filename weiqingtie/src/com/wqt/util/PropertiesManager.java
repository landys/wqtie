package com.wqt.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.apache.log4j.Logger;

/**
 * Thread safe.
 * 
 * @author Jinde
 * 
 */
public class PropertiesManager {
	/**
	 * All properties in the hash map, a property file is corresponding to hash
	 * map entry. Thread safe.
	 */
	private static final Map<String, Properties> propsMap = Collections
			.synchronizedMap(new HashMap<String, Properties>());

	private static final Logger LOG = Logger.getLogger(PropertiesManager.class);

	private PropertiesManager() {
	}

	public static Properties getProperties(final String propsName)
			throws AppException {
		if (!propsMap.containsKey(propsName)) {
			Properties props = new Properties();

			try {
				InputStream in = PropertiesManager.class.getClassLoader()
						.getResourceAsStream(propsName);
				props.load(in);
			}
			catch (IOException e) {
				LOG.error(e.getMessage());
				throw new AppException(
						"Error: IO exception in reading sql property.");
			}
			catch (Exception e) {
				LOG.error(e.getMessage());
				throw new AppException(
						"Error: Unknown exception, maybe file not found.");
			}
			propsMap.put(propsName, props);
		}

		return propsMap.get(propsName);
	}
}
