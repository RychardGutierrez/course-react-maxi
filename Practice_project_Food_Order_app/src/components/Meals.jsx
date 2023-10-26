import { URL_MEALS } from '../api/meal-api';
import Meal from './Meal';
import useHttp from '../hooks/UseHttp';
import Error from './Error';

const requestConfig = { method: 'GET' };

const Meals = () => {
  // const [meals, setMeals] = useState([]);

  // const fetchMeals = async () => {
  //   const data = await getAllMeals();
  //   setMeals(data);
  // };

  // useEffect(() => {
  //   fetchMeals();
  // }, []);

  const {
    data: meals,
    isLoading,
    error,
  } = useHttp(URL_MEALS, requestConfig, []);

  if (error) {
    return <Error title="Fail to get meals" message={error} />;
  }

  return (
    <>
      {isLoading && <p className="center">Loading...</p>}
      {!isLoading && (
        <ul id="meals">
          {meals.map((meal) => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Meals;
