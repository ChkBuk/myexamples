import java.util.Timer;

public class ExecuteTimer {

	public static void main(String[] args) {
		
		FileUtil t3 = new FileUtil("Log");
		Timer t = new Timer();
		t.scheduleAtFixedRate(t3, 5000, 60000*60);
		
	}

}
