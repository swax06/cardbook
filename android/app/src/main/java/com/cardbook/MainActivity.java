package com.cardbook;

import android.graphics.Color;
import android.graphics.Rect;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;

import androidx.core.splashscreen.SplashScreen;
import androidx.core.view.WindowCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import java.util.Objects;

public class MainActivity extends ReactActivity {
  private SplashScreen splashScreen;
  private View rootView;
  private ViewGroup contentContainer;
  private ViewTreeObserver viewTreeObserver;
  private final ViewTreeObserver.OnGlobalLayoutListener listener = this::possiblyResizeChildOfContent;
  private final Rect contentAreaOfWindowBounds = new Rect();
  private int windowHeightFullScreen = 0;
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "CardBook";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
            Objects.requireNonNull(getMainComponentName()),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    getWindow().setNavigationBarColor(Color.TRANSPARENT);
    splashScreen = SplashScreen.installSplashScreen(this);
    splashScreen.setKeepOnScreenCondition(() -> true);
    super.onCreate(null);
    contentContainer = findViewById(android.R.id.content);
    rootView = contentContainer.getChildAt(0);
  }

  public void removeSplashScreen() {
      splashScreen.setKeepOnScreenCondition(() -> false);
  }

  public void finishActivity() {
    finish();
  }

  @Override
  protected void onPause() {
    super.onPause();
    if (viewTreeObserver.isAlive()) {
      viewTreeObserver.removeOnGlobalLayoutListener(listener);
    }
  }

  @Override
  protected void onResume() {
    super.onResume();
    if (viewTreeObserver == null || !viewTreeObserver.isAlive()) {
      viewTreeObserver = rootView.getViewTreeObserver();
    }

    viewTreeObserver.addOnGlobalLayoutListener(listener);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    rootView = null;
    contentContainer = null;
    viewTreeObserver = null;
  }

  private void possiblyResizeChildOfContent() {
    contentContainer.getWindowVisibleDisplayFrame(contentAreaOfWindowBounds);
    int usableHeightNow = contentAreaOfWindowBounds.height();

    if(windowHeightFullScreen == 0) {
      windowHeightFullScreen = usableHeightNow;
    }

    WindowCompat.setDecorFitsSystemWindows(getWindow(), usableHeightNow != windowHeightFullScreen);
  }
}