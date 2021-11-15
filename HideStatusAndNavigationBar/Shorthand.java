package sndev.demo;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import sndev.demo.R;

public class MainActivity extends Activity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    
    // hideNavigationBar();
    
  }
    
  @Override
  protected void onResume() {
    super.onResume();
    hideNavigationBar();
  }
  
  private void hideNavigationBar() {
    this.getWindow().getDecorView().setSystemUiVisibility(
      View.SYSTEM_UI_FLAG_FULLSCREEN |
      View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
      View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
      View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
      View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
      View.SYSTEM_UI_FLAG_LAYOUT_STABLE
    );
  }
  
}
