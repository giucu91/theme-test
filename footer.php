<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Test_Theme
 */

?>

<?php

/**
 * Hook: test_theme_footer.
 *
 * @hooked test_theme_end_div   - 10
 * @hooked test_theme_copyright - 20
 */
do_action( 'test_theme_footer' );

?>

<?php wp_footer(); ?>

</body>
</html>
