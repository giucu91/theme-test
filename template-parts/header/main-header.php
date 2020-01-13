<header id="masthead" class="site-header">
	<div class="container">
		<div class="row">
			<div class="col">
				<div class="site-branding">
					<?php
					the_custom_logo();
					if ( is_front_page() && is_home() ) :
						?>
						<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
						<?php
					else :
						?>
						<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
						<?php
					endif;
					$test_theme_description = get_bloginfo( 'description', 'display' );
					if ( $test_theme_description || is_customize_preview() ) :
						?>
						<p class="site-description"><?php echo $test_theme_description; /* WPCS: xss ok. */ ?></p>
					<?php endif; ?>
				</div><!-- .site-branding -->
			</div>
		</div>
	</div>
</header><!-- #masthead -->