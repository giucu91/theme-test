<footer id="colophon" class="site-footer">
	<div class="site-info container">
		<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'test-theme' ) ); ?>">
			<?php
			/* translators: %s: CMS name, i.e. WordPress. */
			printf( esc_html__( 'Proudly powered by %s', 'test-theme' ), 'WordPress' );
			?>
		</a>
		<span class="sep"> | </span>
			<?php
			/* translators: 1: Theme name, 2: Theme author. */
			printf( esc_html__( 'Theme: %1$s by %2$s.', 'test-theme' ), 'test-theme', '<a href="http://underscores.me/">MachoThemes</a>' );
			?>
	</div><!-- .site-info -->
</footer><!-- #colophon -->