package com.wqt.model;

/**
 * @author Jinde
 * @since 2013-10-7
 *
 */
public class CardAsset extends BaseObject {
	private long cardId;

	private long assetId;

	public CardAsset() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CardAsset(final long cardId, final long assetId) {
		super();
		this.cardId = cardId;
		this.assetId = assetId;
	}

	public long getCardId() {
		return cardId;
	}

	public void setCardId(long cardId) {
		this.cardId = cardId;
	}

	public long getAssetId() {
		return assetId;
	}

	public void setAssetId(long assetId) {
		this.assetId = assetId;
	}

}
