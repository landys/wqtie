package com.wqt.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wqt.model.Asset;

/**
 * @author Jinde
 * @since 2013-10-15
 *
 */
public class AssetManager {
	
	private static List<Asset> musics = null;
	
	private static List<Asset> templates = null;
	
	private static Map<Long, Asset> musicMap = null;
	
	private static Map<Long, Asset> templateMap = null;
	
	static {
		if (musics == null) {
			musics = new ArrayList<Asset>();
			musicMap = new HashMap<Long, Asset>();
			
			Asset asset = new Asset(1, "Because You Loved Me", null, null, "/musics/bylm.mp3", 2, null);
			musics.add(asset);
			musicMap.put(asset.getAssetId(), asset);
		}
		
		if (templates == null) {
			templates = new ArrayList<Asset>();
			templateMap = new HashMap<Long, Asset>();
			
			Asset asset = new Asset(1, "模板1", null, null, null, 4, null);
			templates.add(asset);
			templateMap.put(asset.getAssetId(), asset);
			
//			asset = new Asset(2, "模板2", null, null, null, 4, null);
//			templates.add(asset);
//			templateMap.put(asset.getAssetId(), asset);
//			
//			asset = new Asset(3, "模板3", null, null, null, 4, null);
//			templates.add(asset);
//			templateMap.put(asset.getAssetId(), asset);
		}
	}

	/**
	 * 
	 */
	private AssetManager() {
		// TODO Auto-generated constructor stub
	}
	
	public static Asset findMusicById(final long id) {
		return musicMap.get(id);
	}
	
	public static Asset findTemplateById(final long id) {
		return templateMap.get(id);
	}

	public static List<Asset> findAllMusics() {
		return musics;
	}
	
	public static List<Asset> findAllTemplates() {
		return templates;
	}
}
