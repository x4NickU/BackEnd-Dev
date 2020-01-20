<?php 
defined( 'ABSPATH' ) or die( 'Che ci fai qua?' );
// Hook in
/**
 * Add the field to the checkout

add_action('my_custom_checkout_field' );

function my_custom_checkout_field() {
    $deeplosystem = new DeeploSystem;
    $array = [];
    $current_user = wp_get_current_user();
    $diamonds = $deeplosystem->getDiamond($current_user->ID);
    for ($x = 0; x < $diamonds; $x++) {
        array_push($array, x);
    }
    echo '<div id="my_custom_checkout_field"><h6>' . __('My Field') . '</h2>';
    woocommerce_form_field('my_country_field', array(
        'type'       => 'select',
        'class'      => array($array),
        'label'      => __('Item ships from - country'),
        'placeholder'    => __('Select a Country')
         )
     );
    echo '</div>';

}
 */
add_action( 'woocommerce_cart_calculate_fees', 'add_custom_fee_deeplo', 10, 1 );
function add_custom_fee_deeplo ( $cart ) {
    if ( is_admin() && ! defined( 'DOING_AJAX' ) )
        return;
    global $woocommerce;
    $deeplosystem = new DeeploSystem;
	$current_user = wp_get_current_user();
	$diamonds = $deeplosystem -> getDiamond($current_user->ID);
	$oldTotal = $woocommerce->cart->subtotal;
	$checkIfIsYear = $deeplosystem->ifIsYear($current_user->ID);
	if ($checkIfIsYear != 0) {
		if ($checkIfIsYear >= 3500 && $checkIfIsYear < 9000) {
            $fee = (-($oldTotal * 15) / 100);
            $cart->add_fee( __( 'Sconto 15%', 'woocommerce' ) , $fee, false );
    	}
		if ($checkIfIsYear >= 9000 && $checkIfIsYear < 30000) {
            $fee = (-($oldTotal * 25) / 100);
            $cart->add_fee( __( 'Sconto 25%', 'woocommerce' ) , $fee, false );
    	}
    	if ($checkIfIsYear >= 30000) {
            $fee = (-($oldTotal * 50) / 100);
            $cart->add_fee( __( 'Sconto 50%', 'woocommerce' ) , $fee, false );
    	}
	}else{
        $fee = (-(5 * $diamonds));
        $cart->add_fee( __( 'Sconto Diamanti', 'woocommerce' ) , $fee, false );
    }
}
final class DeeploSystem {

    protected static $_instance = null;

    public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
    }

    function DB() {
        $path = ABSPATH . '/wp-config.php';
        include $path;
        $db = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        return $db;
    }

    public function getFormattedData ($data) {
        $_data = explode('-', $data);
        $bfdata = implode("", $_data);
        $result = substr($bfdata, 0, 4);
        return $result;
    }

    public function ifIsYear($ID) {
        $deeplosystem = new DeeploSystem;
        $DB = $deeplosystem -> DB();
        $currentData = (new \DateTime())->format('Y-m-d H:i:s');
	    $getCreationData = $deeplosystem->getData($ID);
	    $getFormattedCreationData = $deeplosystem->getFormattedData($getCreationData);
	    $getFormattedCurrentData = $deeplosystem->getFormattedData($currentData);
	    if (($getFormattedCurrentData - $getFormattedCreationData) >= 1) {
            $getMoney_Query = "SELECT moneySpent from wp_deeploSystem where id = '$ID'";
            $Money = $DB->query($getMoney_Query);
            if ($Money->num_rows > 0) {
                while($row = $Money->fetch_assoc()) {
                    $_Money = $row["moneySpent"];
                }
            }
            if ($_Money <= 3500) {
                return 0;
            }
            if ($_Money >= 3500) {
                return $_Money;
            }
	    }else{
	    	return 0;
	    }
    }

    public function getData($id) {
        $_DB = new DeeploSystem;
        $DB = $_DB -> DB();
        $getData_Query = "SELECT user_registered from wp_users where ID = '$id'";
        $_data = $DB->query($getData_Query);
        if ($_data->num_rows > 0) {
            while($row = $_data->fetch_assoc()) {
                $data = $row["user_registered"];
            }
            return $data;
        }
    }

    public function checkUser($id) {
        $_DB = new DeeploSystem;
        $DB = $_DB -> DB();
        $getUser_Query = "SELECT ID from wp_deeploSystem where ID = '$id'";
        $user = $DB->query($getUser_Query);
        if ($user->num_rows > 0) {
            while($row = $user->fetch_assoc()) {
                $_User = $row["ID"];
            }
        }else{
            $insertID_Query = "INSERT INTO wp_deeploSystem (ID) VALUES ('$id')";
            $ID_Query = $DB->query($insertID_Query);
        }
        return true;
    }

    public function getDiamond($id) {
        $_DB = new DeeploSystem;
        $DB = $_DB -> DB();
        $getDiamond_Query = "SELECT diamonds from wp_deeploSystem where id = '$id'";
        $Diamond = $DB->query($getDiamond_Query);
        if ($Diamond->num_rows > 0) {
            while($row = $Diamond->fetch_assoc()) {
                $_Diamond = $row["diamonds"];
            }
        }
        return $_Diamond;
    }

    public function getMoneySpent($id) {
        $_DB = new DeeploSystem;
        $DB = $_DB -> DB();
        $getMoney_Query = "SELECT moneySpent from wp_deeploSystem where id = '$id'";
        $Money = $DB->query($getMoney_Query);
        if ($Money->num_rows > 0) {
            while($row = $Money->fetch_assoc()) {
                $_Money = $row["moneySpent"];
            }
            return $_Money;
        }
        
    }

    public function changeDiamonds($id,$_diamonds,$case) {
        $_DB = new DeeploSystem;
        $DB = $_DB -> DB();
        $ACDiamonds = $_DB -> getDiamond($id);
        switch ($case) {
            case '1':
                $diamonds = ($ACDiamonds + $_diamonds);
                $UpdateDiamonds_Query = "UPDATE wp_deeploSystem SET diamonds='$diamonds' WHERE ID = '$id'";
                $updateDiamonds = $DB->query($UpdateDiamonds_Query);
            break;
            case '0':
                $diamonds = ($ACDiamonds - $_diamonds);
                $UpdateDiamonds_Query = "UPDATE wp_deeploSystem SET diamonds='$diamonds' WHERE ID = '$id'";
                $updateDiamonds = $DB->query($UpdateDiamonds_Query);
            break;
        }

    }

    public function addMoneySpent($id,$_money) {
        $_DB = new DeeploSystem;
        $DB = $_DB -> DB();
        $ACMoney = $_DB -> getMoneySpent($id);
        $money = $ACMoney + $_money;
        echo "$money";
        $UpdateMoney_Query = "UPDATE wp_deeploSystem SET moneySpent='$money' WHERE ID = '$id'";
        $updateMoney = $DB->query($UpdateMoney_Query);
    }   
}
?>