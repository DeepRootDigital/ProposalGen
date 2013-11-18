<?php
/*
  Widget Name: Cover Page
  Description: This widget is a coverpage.
  Version: 1.0
  Author: Business On Market St
  Author URI: http://www.businessonmarketst.com
 */

class coverPageWidget extends WP_Widget {

    function coverPageWidget() {
        $widget_ops = array(
            'classname' => 'coverPageWidget',
            'description' => 'This is a coverpage widget'
        );

        $this->WP_Widget(
                'coverPageWidget', 'Proposal Gen - Cover Page Widget', $widget_ops
        );
    }

    function widget($args, $instance) { // widget sidebar output
        extract($args, EXTR_SKIP);

        /* Our variables from the widget settings. */
        $title = $instance['title'];
        $bgcolor = $instance['background-color'];
        $moniker = $instance['moniker'];


        // YOUR DISPLAY OUTPUT GOES HERE!!!!!!!

        echo '<div style="background-color:' . $bgcolor . ';" class="viewport colored">';
        echo '<div class="container">';
        echo '<div class="cover-page">';
        if ($moniker === 'Section 2') {
            echo '<img src = "' . get_template_directory_uri() . '/images/slide-images/section-two-moniker.png" class="section-moniker">';
        } elseif ($moniker === 'Section 3') {
            echo '<img src = "' . get_template_directory_uri() . '/images/slide-images/section-three-moniker.png" class="section-moniker">';
        } elseif ($moniker === 'Section 4') {
            echo '<img src = "' . get_template_directory_uri() . '/images/slide-images/section-four-moniker.png" class="section-moniker">';
        } elseif ($moniker === 'Section 5') {
            echo '<img src = "' . get_template_directory_uri() . '/images/slide-images/section-five-moniker.png" class="section-moniker">';
        }
        echo '<h2>' . $title . '</h2>';
        echo '<div class = "slider-navigation">';
        echo '<img class = "previous" src = "' . get_template_directory_uri() . '/images/prev-button.png">';
        echo '<img class = "next" src = "' . get_template_directory_uri() . '/images/next-button.png">';
        echo '</div>';
        echo '</div>';
        echo '</div>';
        echo '</div>';
    }

    /**
     * Update the widget settings.
     * */
    function update($new_instance, $old_instance) {
        $instance = $old_instance;

        /* Strip tags for title and name to remove HTML (important for text inputs). */
        $instance['title'] = strip_tags($new_instance['title']);
        $instance['background-color'] = strip_tags($new_instance['background-color']);
        $instance['moniker'] = strip_tags($new_instance['moniker']);

        return $instance;
    }

    /**
     * Displays the widget settings controls on the widget panel.
     * Make use of the get_field_id() and get_field_name() function
     * when creating your form elements. This handles the confusing stuff.
     */
    function form($instance) {

        /* Set up some default widget settings. */
        $defaults = array('title' => __('title', 'example'), 'background-color' => __('background-color', 'example'), 'moniker' => __('moniker', 'Section 2'),);
        $instance = wp_parse_args((array) $instance, $defaults);
        ?>

        <!-- Title: Text Input -->
        <p>
            <label for="<?php echo $this->get_field_id('background-color'); ?>"><?php _e('Background Color:', 'hybrid'); ?></label>
            <input id="<?php echo $this->get_field_id('background-color'); ?>" name="<?php echo $this->get_field_name('background-color'); ?>" value="<?php echo $instance['background-color']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:', 'hybrid'); ?></label>
            <input id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $instance['title']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('moniker'); ?>"><?php _e('Section Moniker:', 'Section 2'); ?></label> 
            <select id="<?php echo $this->get_field_id('moniker'); ?>" name="<?php echo $this->get_field_name('moniker'); ?>" class="widefat" style="width:100%;">
                <option <?php if ('Section 2' == $instance['moniker']) echo 'selected="selected"'; ?>>Section 2</option>
                <option <?php if ('Section 3' == $instance['moniker']) echo 'selected="selected"'; ?>>Section 3</option>
                <option <?php if ('Section 4' == $instance['moniker']) echo 'selected="selected"'; ?>>Section 4</option>
                <option <?php if ('Section 5' == $instance['moniker']) echo 'selected="selected"'; ?>>Section 5</option>
            </select>
        </p>

        <?php
    }

}

add_action(
        'widgets_init', create_function('', 'return register_widget("coverPageWidget");')
);
?>