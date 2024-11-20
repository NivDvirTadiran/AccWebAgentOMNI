package tadiran.accagentapi.selenium;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.SelenideElement;
import com.codeborne.selenide.logevents.SelenideLogger;
import io.qameta.allure.selenide.AllureSelenide;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.FindBy;
import org.w3c.dom.html.HTMLInputElement;

import static com.codeborne.selenide.Selenide.open;
import static jdk.nashorn.internal.runtime.regexp.joni.Config.log;

public class MainPageTest {
    MainPage mainPage = new MainPage();



    @FindBy(xpath = "/html/body/chat-widget//div/div/app-login-form/form/div[1]/input")
    public HTMLInputElement nameInput;

    @FindBy(xpath = "//chat-widget")
    public SelenideElement chatwidget4;

@BeforeAll    public static void setUpAll() {
        Configuration.browserSize = "1280x800";
        SelenideLogger.addListener("allure", new AllureSelenide());
    }

@BeforeEach    public void setUp() {
        // Fix the issue https://github.com/SeleniumHQ/selenium/issues/11750
        Configuration.browserCapabilities = new ChromeOptions().addArguments("--remote-allow-origins=*");
        open("https://172.28.31.87:8443/aeonix/msg/ChatWidget/support-acc.html");

    }

    @Test
    public void search() throws InterruptedException {

        SelenideElement questionMark = mainPage.searchQuestionMarkButton;
        //questionMark.innerHtml().as.pressEnter().getScreenshotAs(OutputType.FILE);
        WebDriver webDriver = mainPage.chatwidget.last().getWrappedDriver();
        JavascriptExecutor js = (JavascriptExecutor) webDriver;

        //js.executeScript((ScriptKey) webDriver.findElement(By.tagName("script")));
        String name = webDriver.findElement(By.tagName("button")).getDomAttribute("class");
        //(30000);

        log.print("\nstart\n");
        //log.print(webDriver.getPageSource());
        log.print(name);
        log.print("\nstop\n");




        //mainPage.chatwidget.last().getSelectedOption().click();


        //$("chat-widget").shouldBe(visible);

        //SelenideElement questionMark = mainPage.searchQuestionMarkButton;

        //mainPage.chatwidget.last().getSelectedOption().click();
        //questionMark.findElement(By.xpath("//div/button")).click();
        //questionMark.findElement(By.xpath("//div/div/app-login-form/form/div[1]/input")).click();
        //mainPage.mNameInput.setValue("ploni");

        //$("/html/body/chat-widget/div/div/app-login-form/form/div[1]/input").sendKeys("Selenium");
        //$("chat-widget[theme='blue']").click();

        //$("input[data-test='search-input']").shouldHave(attribute("value", "Selenium"));
    }
/*
    @Test
    public void toolsMenu() {
        mainPage.toolsMenu.click();

        $("div[data-test='main-submenu']").shouldBe(visible);
    }

    @Test
    public void navigationToAllTools() {
        mainPage.seeDeveloperToolsButton.click();
        mainPage.findYourToolsButton.click();

        $("#products-page").shouldBe(visible);

        assertEquals("All Developer Tools and Products by JetBrains", Selenide.title());
    }

 */
}
