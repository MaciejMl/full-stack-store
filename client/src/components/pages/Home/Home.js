import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getProd, fetchProd } from '../../../redux/productsRedux';
// import HomeProd from '../HomeProd/HomeProd';
import { useEffect, useCallback, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import clsx from 'clsx';
import styles from './Home.module.scss';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const prods = useSelector(getProd);

  const dispatch = useDispatch();

  const memoizedFetchProd = useCallback(() => {
    dispatch(fetchProd());
  }, [dispatch]);

  useEffect(() => {
    memoizedFetchProd();
  }, [memoizedFetchProd]);

  useEffect(() => {
    setLoading(false);
    if (prods.length) {
      setLoading(false);
    }
  }, [prods]);

  if (loading) {
    return (
      <Container className="mt-4 mb-4 px-0">
        <div className="d-flex align-items-center">
          <span className="ms-4">Loading...</span>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-4 px-0">
      <h2 className={clsx('col-12 col-sm-3 mx-auto', styles.header)}>
        BEARD MASTER
      </h2>

      {prods.length === 0 && (
        <Container className="mt-4 mb-4 px-0">
          <div className="alert alert-warning">
            No products found in the database.
          </div>
        </Container>
      )}

      {/* {prods.map((prod) => (
        <HomeProd key={prod.id} {...prod} />
      ))} */}
    </Container>
  );
};

export default Home;
