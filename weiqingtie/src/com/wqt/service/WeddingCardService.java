package com.wqt.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wqt.dao.AgentDao;
import com.wqt.dao.AssetDao;
import com.wqt.dao.CardAssetDao;
import com.wqt.dao.PlaceDao;
import com.wqt.dao.WeddingCardDao;
import com.wqt.model.Agent;
import com.wqt.model.Asset;
import com.wqt.model.CardAsset;
import com.wqt.model.Place;
import com.wqt.model.WeddingCard;
import com.wqt.util.AppException;

/**
 * @author Jinde
 * @since 2013-10-8
 * 
 */
public class WeddingCardService {
	private WeddingCardDao cardDao;

	private AgentDao agentDao;

	private PlaceDao placeDao;

	private AssetDao assetDao;

	private CardAssetDao cardAssetDao;

	public WeddingCardService() {
		super();

		try {
			cardDao = new WeddingCardDao();
			agentDao = new AgentDao();
			placeDao = new PlaceDao();
			assetDao = new AssetDao();
			cardAssetDao = new CardAssetDao();
		}
		catch (AppException e) {
			// do nothing
		}
	}

	public WeddingCard findWeddingCard(final long cardId) {
		WeddingCard card = null;

		try {
			card = cardDao.find(cardId);
			Agent agent = card.getAgent();
			if (agent != null) {
				card.setAgent(agentDao.find(agent.getAgentId()));
			}

			Place place = card.getPlace();
			if (place != null) {
				card.setPlace(placeDao.find(place.getPlaceId()));
			}
		}
		catch (AppException e) {
			// do nothing.
		}

		return card;
	}

	public List<WeddingCard> findWeddingCardsByUserId(final long userId) {
		List<WeddingCard> cards = null;
		try {
			cards = cardDao.findWeddingCardsByUserId(userId);

			if (cards != null && cards.size() > 0) {
				// get agentIds and placeIds to find Agents and Places in db.
				List<Long> agentIds = new ArrayList<Long>();
				List<Long> placeIds = new ArrayList<Long>();
				for (WeddingCard card : cards) {
					agentIds.add(card.getAgent().getAgentId());
					placeIds.add(card.getPlace().getPlaceId());
				}

				// get Agent objects and construct map.
				List<Agent> agents = agentDao.findAgentsInIds(agentIds);
				Map<Long, Agent> agentMap = new HashMap<Long, Agent>();
				for (Agent agent : agents) {
					agentMap.put(agent.getAgentId(), agent);
				}

				// get Place objects and construct map.
				List<Place> places = placeDao.findPlacesInIds(placeIds);
				Map<Long, Place> placeMap = new HashMap<Long, Place>();
				for (Place place : places) {
					placeMap.put(place.getPlaceId(), place);
				}

				// Fulfill Agent and Place information for WeddingCards.
				for (WeddingCard card : cards) {
					long agentId = card.getAgent().getAgentId();
					if (agentMap.containsKey(agentId)) {
						card.setAgent(agentMap.get(agentId));
					}

					long placeId = card.getPlace().getPlaceId();
					if (placeMap.containsKey(placeId)) {
						card.setPlace(placeMap.get(placeId));
					}
				}
			}
		}
		catch (AppException e) {
			// do nothing
		}

		return cards;
	}

	public boolean deleteWeddingCard(final long cardId, final long userId) {
		try {
			WeddingCard card = cardDao.find(cardId);
			if (card.getUser().getUserId() != userId) {
				// the card doesn't belong to the user.
				return false;
			}

			cardDao.delete(cardId);
		}
		catch (AppException e) {
			// do nothing

			return false;
		}

		return true;
	}

	public void saveOrUpdateWeddingCard(final WeddingCard card) {
		try {
			if (card != null) {
				// no need to save agent. Agent is saved in other way.
				// if (card.getAgent() != null) {
				// agentDao.saveOrUpdate(card.getAgent());
				// }

				if (card.getPlace() != null) {
					placeDao.saveOrUpdate(card.getPlace());
				}

				// saving card must be after saving place.
				cardDao.saveOrUpdate(card);
			}
		}
		catch (AppException e) {
			// do nothing
		}
	}

	public List<Asset> findPhotosByCardId(final long cardId, final long userId) {
		List<Asset> photos = null;
		try {
			photos = assetDao.findAssetsByCardId(cardId, userId);
		}
		catch (AppException e) {
			// do nothing
		}

		return photos;
	}

	public void saveOrUpdateAsset(final Asset asset, final long cardId) {
		if (asset == null) {
			return;
		}

		try {
			assetDao.saveOrUpdate(asset);

			cardAssetDao
					.saveOrUpdate(new CardAsset(cardId, asset.getAssetId()));
		}
		catch (AppException e) {
			// do nothing
		}
	}
	
	public List<Agent> findAllAgents() {
		List<Agent> agents = null;
		try {
			agents = agentDao.findAll();
		}
		catch (AppException e) {
			// do nothing
		}
		
		return agents;
	}
}
