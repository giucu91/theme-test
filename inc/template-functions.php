<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Test_Theme
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function test_theme_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'test_theme_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function test_theme_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'test_theme_pingback_header' );

function test_theme_header(){
	get_template_part( 'template-parts/header/main-header' );
}
add_action( 'test_theme_header', 'test_theme_header', 10 );

function test_theme_navigation(){
	get_template_part( 'template-parts/header/main-navigation' );
}
add_action( 'test_theme_header', 'test_theme_navigation', 20 );

function test_theme_copyright(){
	get_template_part( 'template-parts/footer/copyright' );
}
add_action( 'test_theme_footer', 'test_theme_copyright', 20 );


function test_theme_start_container(){
	echo '<div class="container">';
}
add_action( 'test_theme_header', 'test_theme_start_container', 90 );
function test_theme_end_div(){
	echo '</div>';
}
add_action( 'test_theme_footer', 'test_theme_end_div', 10 );


