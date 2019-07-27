import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.TimerTask;

public class FileUtil extends TimerTask {
	private String name;
	public FileUtil(String n) {
		this.name = n;
	}
	
	@SuppressWarnings("resource")
	private static void copyFile(File sourceFile, File destFile)
	        throws IOException {
		//System.out.println(sourceFile);System.out.println(destFile);
		
	    if (!sourceFile.exists()) {
	        return;
	    }
	    if (!destFile.exists()) {
	        destFile.createNewFile();
	    }
	    FileChannel source = null;
	    FileChannel destination = null;
	    source = new FileInputStream(sourceFile).getChannel();
	    destination = new FileOutputStream(destFile).getChannel();
	    if (destination != null && source != null) {
	        destination.transferFrom(source, 0, source.size());
	    }
	    if (source != null) {
	        source.close();
	    }
	    if (destination != null) {
	        destination.close();
	    }

	}
	
	public static void main(String args[]) {

		SimpleDateFormat gmtDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		gmtDateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
	}

	@Override
	public void run() {

		SimpleDateFormat gmtDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		gmtDateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
		String timestamp = gmtDateFormat.format(new Date()).toString();
		
	    System.out.println(Thread.currentThread().getName() + " " + name + " the task has executed successfully " + new Date());
	    
		File source = new File("D:/MyWork/AMC/graph.docx");
		File dest = new File("D:/MyWork/AMC/Charith/graph"+timestamp+".docx");
		try {
			copyFile(source,dest);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if ("Task1".equalsIgnoreCase(name)) {
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	
		
	}
	
}
