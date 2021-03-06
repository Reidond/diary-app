import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  ADD_ITEMS_TO_STORE,
  ADD_ITEM,
  REMOVE_ITEM,
  SELECT_ITEM,
  LOAD_ITEM,
  REMOVE_CURRENT_ITEM,
  ADD_COMMENTS_TO_STORE,
  REMOVE_ALL_COMMENTS
} from '../actions/actionTypes';
import AddItem from './AddItem';
import Item from './Item';

const Items = ({
  getItems,
  addItem,
  removeItem,
  items,
  currentItem,
  selectItem,
  loadItem,
  removeCurrentItem,
  removeAllComments,
  getComments
}) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    loadItem();
  }, [loadItem]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <div className="card shadow-sm bg-white rounded">
      <div className="card-body">
        <h2 className="card-title right-view--title pb-3">Items</h2>
        <AddItem addItem={addItem} />
        <div className="row pt-3">
          {items.map(item => (
            <Item
              currentItem={currentItem}
              item={item}
              removeItem={removeItem}
              removeCurrentItem={removeCurrentItem}
              removeAllComments={removeAllComments}
              selectItem={selectItem}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  items: state.items.entries,
  currentItem: state.currentItem.selectedEntry
});

const mapDispatchToProps = dispatch => {
  return {
    getItems: () => dispatch({ type: ADD_ITEMS_TO_STORE }),
    addItem: item => dispatch({ type: ADD_ITEM, payload: item }),
    removeItem: id => dispatch({ type: REMOVE_ITEM, payload: id }),
    selectItem: item => dispatch({ type: SELECT_ITEM, payload: item }),
    loadItem: () => dispatch({ type: LOAD_ITEM }),
    removeCurrentItem: () => dispatch({ type: REMOVE_CURRENT_ITEM }),
    getComments: () => dispatch({ type: ADD_COMMENTS_TO_STORE }),
    removeAllComments: id =>
      dispatch({ type: REMOVE_ALL_COMMENTS, payload: id })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
