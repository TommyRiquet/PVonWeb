var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('Backend de l\'application PVonWeb');
});

module.exports = router;
