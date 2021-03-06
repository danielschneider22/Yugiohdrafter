export enum CardSetActionTypes 
{
  // - CardSet publish fetch (save to database)
  CARD_SET_PUBLISH_FETCH = 'CARD_SET/CARD_SET_PUBLISH_FETCH',
  CARD_SET_PUBLISH_FETCH_FAIL = 'CARD_SET/CARD_SET_PUBLISH_FETCH_FAIL',
  CARD_SET_PUBLISH_FETCH_SUCCESS = 'CARD_SET/CARD_SET_PUBLISH_FETCH_SUCCESS',

  // - CardSet publish fetch (remove from database)
  CARD_SETS_DELETE_FETCH = 'CARD_SET/CARD_SETS_DELETE_FETCH',
  CARD_SETS_DELETE_FETCH_FAIL = 'CARD_SET/CARD_SETS_DELETE_FETCH_FAIL',
  CARD_SETS_DELETE_FETCH_SUCCESS = 'CARD_SET/CARD_SETS_DELETE_FETCH_SUCCESS',
}