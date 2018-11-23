package net.vaorra.spotifymultidevice;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class SMDMainActivity extends AppCompatActivity {

    Button createButton;
    Button joinButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_smdmain);

        //Get UI Widgets
        createButton = this.findViewById(R.id.create_room);
        joinButton = this.findViewById(R.id.join_room);

        //Register Events
        registerEvents();
    }

    private void registerEvents(){

        createButton.setOnClickListener(
                new Button.OnClickListener(){
                    @Override
                    public void onClick(View v) {
                        Intent intent = new Intent(v.getContext(), RoomActivity.class);
                        startActivity(intent);
                    }
                }
        );

        joinButton.setOnClickListener(
                new Button.OnClickListener(){
                    @Override
                    public void onClick(View v) {
                        Intent intent = new Intent(v.getContext(), JoinRoomActivity.class);
                        startActivity(intent);
                    }
                }
        );
    }
}
