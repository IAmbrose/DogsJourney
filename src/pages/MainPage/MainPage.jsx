import { Grid } from '@mui/material';
import SearchBar from '../../components/SearchBar/SearchBar'

const MainPage = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
    <Grid>
        <SearchBar />
      </Grid>
    </Grid>
  );
};
export default MainPage