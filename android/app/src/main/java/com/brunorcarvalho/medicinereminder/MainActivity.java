package com.brunorcarvalho.medicinereminder;

import com.facebook.react.ReactActivity;

import com.reactnativecomponent.splashscreen.RCTSplashScreen;
import android.widget.ImageView;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
    // RCTSplashScreen.openSplashScreen(this);   //open splashscreen
    RCTSplashScreen.openSplashScreen(this, true, ImageView.ScaleType.FIT_XY);   //open splashscreen fullscreen
    super.onCreate(savedInstanceState);
}
    protected String getMainComponentName() {
        return "MedicineReminder";
    }
}
