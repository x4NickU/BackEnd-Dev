import './LoadEnv'; // Must be the first import
import app from '@server';
import { logger } from '@shared';

// Start the server
const port = Number(process.env.PORT || 3000);
// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.render( "index" );
} );
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
