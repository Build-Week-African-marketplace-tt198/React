import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllItems } from "../actions/itemActions";

function DisplayAllItems(props) {
  useEffect(() => {
    props.getAllItems();
    // console.log(props);
  }, []);

  return (
    <div>
      {props.items.map((item) => {
        return (
          <div key={item.id}>
            <span>{item.product}</span>
            <span>{item.description}</span>
            <span>{item.price}</span>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.item.allItems,
    // ...state,
  };
};

export default connect(mapStateToProps, { getAllItems })(DisplayAllItems);
