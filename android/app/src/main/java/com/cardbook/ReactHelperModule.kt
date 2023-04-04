package com.cardbook

//noinspection SuspiciousImport
import android.R
import android.os.Build
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*
import com.cardbook.MainActivity as CardbookMainActivity


class ReactHelperModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "ReactHelperModule"

    override fun getConstants(): MutableMap<String, Any?> {
        val constants: MutableMap<String, Any?> = HashMap()

        constants["isSupported"] = isSupported()
        constants["initialPalette"] = getSystemColorPalette()

        return constants
    }

    private fun isSupported(): Boolean {
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.S
    }
    @ReactMethod(isBlockingSynchronousMethod = true)
    fun removeSplashScreen() {
        val activity: CardbookMainActivity? = reactContext.currentActivity as CardbookMainActivity?
        activity?.removeSplashScreen()
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun closeApp() {
        val activity: CardbookMainActivity? = reactContext.currentActivity as CardbookMainActivity?
        activity?.finishActivity()
    }

    @ReactMethod
    fun getSystemColorPalettePromise(promise: Promise) {
        try {
            val colors = getSystemColorPalette()
            promise.resolve(colors)
        } catch(e: Exception) {
            print(e)
            promise.reject("Create return palette", e)
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getSystemColorPalette(): WritableMap {
        val palette: WritableMap = WritableNativeMap()

        if(!isSupported()) {
            return palette
        }

        val lightPalette: WritableMap = WritableNativeMap()
        lightPalette.putString("primary", colorToHex(R.color.system_accent1_600))
        lightPalette.putString("onPrimary", colorToHex(R.color.system_accent1_0))
        lightPalette.putString("primaryContainer", colorToHex(R.color.system_accent1_100))
        lightPalette.putString("onPrimaryContainer", colorToHex(R.color.system_accent1_900))

        lightPalette.putString("secondary", colorToHex(R.color.system_accent2_600))
        lightPalette.putString("onSecondary", colorToHex(R.color.system_accent2_0))
        lightPalette.putString("secondaryContainer", colorToHex(R.color.system_accent2_100))
        lightPalette.putString("onSecondaryContainer", colorToHex(R.color.system_accent2_900))

        lightPalette.putString("tertiary", colorToHex(R.color.system_accent3_600))
        lightPalette.putString("onTertiary", colorToHex(R.color.system_accent3_0))
        lightPalette.putString("tertiaryContainer", colorToHex(R.color.system_accent3_100))
        lightPalette.putString("onTertiaryContainer", colorToHex(R.color.system_accent3_900))

        lightPalette.putString("background", colorToHex(R.color.system_neutral1_10))
        lightPalette.putString("onBackground", colorToHex(R.color.system_neutral1_900))

        lightPalette.putString("surface", colorToHex(R.color.system_neutral1_10))
        lightPalette.putString("onSurface", colorToHex(R.color.system_neutral1_900))
        lightPalette.putString("surfaceVariant", colorToHex(R.color.system_neutral2_100))
        lightPalette.putString("onSurfaceVariant", colorToHex(R.color.system_neutral2_700))

        lightPalette.putString("outline", colorToHex(R.color.system_neutral2_500))
        lightPalette.putString("outlineVariant", colorToHex(R.color.system_neutral2_200))

        lightPalette.putString("inverseSurface", colorToHex(R.color.system_neutral1_800))
        lightPalette.putString("inverseOnSurface", colorToHex(R.color.system_neutral1_50))
        lightPalette.putString("inversePrimary", colorToHex(R.color.system_accent1_200))

        val darkPalette: WritableMap = WritableNativeMap()
        darkPalette.putString("primary", colorToHex(R.color.system_accent1_200))
        darkPalette.putString("onPrimary", colorToHex(R.color.system_accent1_800))
        darkPalette.putString("primaryContainer", colorToHex(R.color.system_accent1_700))
        darkPalette.putString("onPrimaryContainer", colorToHex(R.color.system_accent1_100))

        darkPalette.putString("secondary", colorToHex(R.color.system_accent2_200))
        darkPalette.putString("onSecondary", colorToHex(R.color.system_accent2_800))
        darkPalette.putString("secondaryContainer", colorToHex(R.color.system_accent2_700))
        darkPalette.putString("onSecondaryContainer", colorToHex(R.color.system_accent2_100))

        darkPalette.putString("tertiary", colorToHex(R.color.system_accent3_200))
        darkPalette.putString("onTertiary", colorToHex(R.color.system_accent3_800))
        darkPalette.putString("tertiaryContainer", colorToHex(R.color.system_accent3_700))
        darkPalette.putString("onTertiaryContainer", colorToHex(R.color.system_accent3_100))

        darkPalette.putString("background", colorToHex(R.color.system_neutral1_900))
        darkPalette.putString("onBackground", colorToHex(R.color.system_neutral1_100))

        darkPalette.putString("surface", colorToHex(R.color.system_neutral1_900))
        darkPalette.putString("onSurface", colorToHex(R.color.system_neutral1_100))
        darkPalette.putString("surfaceVariant", colorToHex(R.color.system_neutral2_700))
        darkPalette.putString("onSurfaceVariant", colorToHex(R.color.system_neutral2_200))

        darkPalette.putString("outline", colorToHex(R.color.system_neutral2_400))
        darkPalette.putString("outlineVariant", colorToHex(R.color.system_neutral2_700))

        darkPalette.putString("inverseSurface", colorToHex(R.color.system_neutral1_100))
        darkPalette.putString("inverseOnSurface", colorToHex(R.color.system_neutral1_800))
        darkPalette.putString("inversePrimary", colorToHex(R.color.system_accent1_600))

        palette.putMap("dark", darkPalette)
        palette.putMap("light", lightPalette)

        return palette
    }

    private fun colorToHex(c: Int?): String {
        if(c == null) {
            return "#00000000"
        }
        val hex = getColor(c)

        return java.lang.String.format("#%06X", 0xFFFFFF and hex)
    }

    private fun getColor(id: Int): Int {
        return ContextCompat.getColor(reactContext, id)
    }
}
