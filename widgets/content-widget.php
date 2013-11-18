<?php
/*
  Widget Name: Content Page
  Description: This widget is a content page.
  Version: 1.0
  Author: Business On Market St
  Author URI: http://www.businessonmarketst.com
 */

class contentPageWidget extends WP_Widget {

    function contentPageWidget() {
        $widget_ops = array(
            'classname' => 'contentPageWidget',
            'description' => 'This is a content widget'
        );

        $this->WP_Widget(
                'contentPageWidget', 'Proposal Gen - Content Page Widget', $widget_ops
        );
    }

    function widget($args, $instance) { // widget sidebar output
        extract($args, EXTR_SKIP);

        /* Our variables from the widget settings. */
        $topcontent = $instance['topcontent'];
        $bottomcontent = $instance['bottomcontent'];
        $companylogo = $instance['companylogo'];


        // YOUR DISPLAY OUTPUT GOES HERE!!!!!!!

        echo '<div class="viewport">';
        echo '<div class="container">';
        echo '<div class="overview-slide">';
        echo '<img src="'.$companylogo.'" class="company-logo">';
        echo '<div class="slide-content">';
        echo '<p>'.$topcontent.'</p>';
        echo '<p>'.$bottomcontent.'</p>';
        echo '</div>';
        echo '<div class="slider-navigation">';
        echo '<img class="previous" src="'.get_template_directory_uri().'/images/prev-button.png">';
        echo '<img class="next" src="'.get_template_directory_uri().'/images/next-button.png">';
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
        $instance['topcontent'] = strip_tags($new_instance['topcontent']);
        $instance['bottomcontent'] = strip_tags($new_instance['bottomcontent']);
        $instance['companylogo'] = strip_tags($new_instance['companylogo']);

        return $instance;
    }

    /**
     * Displays the widget settings controls on the widget panel.
     * Make use of the get_field_id() and get_field_name() function
     * when creating your form elements. This handles the confusing stuff.
     */
    function form($instance) {

        /* Set up some default widget settings. */
        $defaults = array('topcontent' => __('topcontent', 'example'), 'bottomcontent' => __('bottomcontent', 'example'), 'companylogo' => __('companylogo', 'URL of Image'),);
        $instance = wp_parse_args((array) $instance, $defaults);
        ?>

        <!-- Title: Text Input -->
        <p>
            <label for="<?php echo $this->get_field_id('topcontent'); ?>"><?php _e('Top Content:', 'hybrid'); ?></label>
            <textarea id="<?php echo $this->get_field_id('topcontent'); ?>" name="<?php echo $this->get_field_name('topcontent'); ?>" style="width:100%;" ><?php echo $instance['topcontent']; ?></textarea>
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('bottomcontent'); ?>"><?php _e('Bottom Content:', 'hybrid'); ?></label>
            <textarea id="<?php echo $this->get_field_id('bottomcontent'); ?>" name="<?php echo $this->get_field_name('bottomcontent'); ?>" style="width:100%;" ><?php echo $instance['bottomcontent']; ?></textarea>
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('companylogo'); ?>"><?php _e('Company Logo URL:', 'hybrid'); ?></label>
            <input id="<?php echo $this->get_field_id('companylogo'); ?>" name="<?php echo $this->get_field_name('companylogo'); ?>" value="<?php echo $instance['companylogo']; ?>" style="width:100%;" />
        </p>

        <?php
    }

}

add_action(
        'widgets_init', create_function('', 'return register_widget("contentPageWidget");')
);
?>