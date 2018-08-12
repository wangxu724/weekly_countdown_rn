package com.weekly_countdown_rn.fullScreen;

import android.app.Activity;
import android.view.View;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;

public class FullScreen extends ReactContextBaseJavaModule {

    public FullScreen(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void initialize() {

    }

    @Override
    public String getName() {
        return "FullScreen";
    }

    @ReactMethod
    public void on() {
        final Activity activity = getCurrentActivity();

        if (activity != null) {
            activity.runOnUiThread(
                new Runnable() {
                    @Override
                    public void run() {
                        activity.getWindow().getDecorView().setSystemUiVisibility(
                            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                            | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                            | View.SYSTEM_UI_FLAG_IMMERSIVE
                        );
                    }
                }
            );
        }
    }

    @ReactMethod
    public void off() {
        final Activity activity = getCurrentActivity();

        if (activity != null) {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    activity.getWindow().getDecorView().setSystemUiVisibility(
                        View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    );
                }
            });
        }
    }
}