package com.example.onthejourney.Activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity  {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = new Intent(this, LoginActivity.class);

        try {
            Thread.sleep(200);
        }
        catch(InterruptedException e) {
            e.printStackTrace();
        }

        startActivity(intent);
        finish();
    }
}
