import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadPets } from '../store/pets/pets';

/**
 * COMPONENT
 */
class allDogs extends React.Component {
  constructor() {
    super();

  };

  componentDidMount() {
    this.props.loadPets();
  };

  render() {
    console.log(this.props)
    return (
      <div>
        <h3>Welcome, allDogs </h3>
        <div id="leftAllDogs"></div>
        <div id="rightAllDogs">
          <ul id="dogCards">
            {dogs.map((dog) => (
              <li>
                <ul id="individualCards">
                  <li>
                    <img src="/media/tempCard.jpg" />
                  </li>
                  <li>Breed: {dog.breed} </li>
                  <li>Born on: {dog.age}</li>
                  <li>
                    <Link to={`/dog/:${dog.id}`}> More Details </Link>
                  </li>
                  <li>
                    <button class="button-37" role="button">
                      Add to Cart
                    </button>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     username: state.auth.username,
//   };
// };

// export default connect(mapState)(Home);

const mapStateToProps = (state) => { //to access campuses in props
  return {
    pets: state.pets,
    users: state.users
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPets: () => dispatch(loadPets()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(allDogs);
