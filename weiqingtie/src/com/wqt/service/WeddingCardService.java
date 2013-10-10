package com.wqt.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wqt.dao.AgentDao;
import com.wqt.dao.PlaceDao;
import com.wqt.dao.WeddingCardDao;
import com.wqt.model.Agent;
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

	public WeddingCardService() {
		super();

		try {
			cardDao = new WeddingCardDao();
			agentDao = new AgentDao();
			placeDao = new PlaceDao();
		}
		catch (AppException e) {
			// do nothing
		}
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

	public void deleteWeddingCard(long cardId) {
		try {
			cardDao.delete(cardId);
		}
		catch (AppException e) {
			// do nothing
		}
	}
	
	public void saveOrUpdateWeddingCard(WeddingCard card) {
		try {
			if (card != null) {
				cardDao.saveOrUpdate(card);
				
				if (card.getAgent() != null) {
					agentDao.saveOrUpdate(card.getAgent());
				}
				
				if (card.getPlace() != null) {
					placeDao.saveOrUpdate(card.getPlace());
				}
			}
		}
		catch (AppException e) {
			// do nothing
		}
	}
}
