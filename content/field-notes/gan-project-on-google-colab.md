---
title: "Google Colab"
topic: "Research & ML"
summary: "Gemini"
---

Gemini

This project aims to explore a ML pipeline for a Synthetic Data Generation using principles of Generative Adversarial Networks to create predictive/forecasting datasets for financial data analysis and predictions. It should be able to be replicated in Colab for cloud or GPU acceleration for faster computation due to its complexity.

Using ANY possible python DS/ML/DL packages available to prototype a machine learning model. Will be using multiple financial modelling/technical ananlysis tools where needed. I intend to focus on ARIMA and LSTM, as well regression and classification techniques etc. Dataset is derived from yfinance and are therefore considered labelled data.

Some other pacakages we can use are Keras, Tensorflow, Pytorch, xgboost, decisiontree, regressor, k-means clustering, exponential smoothing etc.

Prepare a ML architecture and define the training process. Also come up with statistical means to validate and test for the generated data.

Ensure that the codes produced iteratively updates the generator to produce realistic data comparable to historical/actual data.

This task will primarily be a SUPERVISED LEARNING task

---

Gemini

```markdown
1.  Data Preprocessing: Compute technical indicators and prepare the dataset.
2.  Synthetic Data Generation: Use a Time-Series GAN to augment the dataset.
3.  Model Training: Train a Random Forest Regressor and an LSTM model.
4.  Forecasting: Predict future prices and plot the results.
```

---

Gemini

\[ \]

---

Gemini

```
1
   2
   3
   4
   5
   6
   7
   8
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.keras import layers, models, optimizers
import matplotlib.pyplot as plt
import seaborn as sns # for plotting
Start coding or generate with AI.
```

---

Gemini

Data Download

---

Gemini

```
1
   2
   3
   4
   5
   6
   7
   8
   9
  10
  11
  12
  13
  14
  15
# Getting the data
ticker = input("Enter the ticker symbol (e.g., AAPL, TSLA): ")
today = pd.Timestamp.today().strftime('%Y-%m-%d')
data = yf.download(ticker, start="2024-01-01", end=today)
prices = data['Adj Close'].dropna()
#only using MA and daily returns
data['Daily Return'] = data['Adj Close'].pct_change(1) * 100
data['Daily Return'] = data['Daily Return'].fillna(0)
data['Target'] = data['Adj Close'].shift(-1)
data['MA10'] = data['Adj Close'].rolling(window=10).mean()
data['MA20'] = data['Adj Close'].rolling(window=20).mean()
data['MA50'] = data['Adj Close'].rolling(window=50).mean()
data['MA80'] = data['Adj Close'].rolling(window=80).mean()
data['MA100'] = data['Adj Close'].rolling(window=100).mean()
data['MA120'] = data['Adj Close'].rolling(window=120).mean()
Start coding or generate with AI.
```

```
Enter the ticker symbol (e.g., AAPL, TSLA): AAPL
```

```
[*********************100%***********************]  1 of 1 completed
```

---

Gemini

```
1
   2
   3
   4
   5
   6
   7
   8
   9
  10
  11
  12
  13
  14
  15
  16
  17
  18
  19
  20
  21
  22
  23
  24
  25
  26
  27
import pandas as pd
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
data.dropna(inplace=True)

#feature selection - selecting all the aboove only
features = ['Daily Return', 'Target', 'MA10', 'MA20', 'MA50', 'MA80', 'MA100', 'MA120']
data = data[features].dropna()
print("Data after preprocessing:")
print(data.head())

#data splitting - defining the input features and target
X = data[features]
y = data['Target'] #we have to focus on features since GANs generate data similar to the training data
train_data, test_data = train_test_split(X, test_size=0.2, random_state=678) #adjust test size and random state as necessary
print("Training data shape:", train_data.shape)
print("Testing data shape:", test_data.shape)

#scaler
scaler = MinMaxScaler()
train_scaled = scaler.fit_transform(train_data)
test_scaled = scaler.transform(test_data)
train_scaled = pd.DataFrame(train_scaled, columns=features, index=train_data.index) #converting to dataframe for easier manipulation
test_scaled = pd.DataFrame(test_scaled, columns=features, index=test_data.index)
print("Scaled training data:")
print(train_scaled.head())
Start coding or generate with AI.
```

```
Data after preprocessing:
Price      Daily Return      Target        MA10        MA20        MA50  \
Ticker                                                                    
Date                                                                      
2024-06-24     0.313265  208.598785  209.161513  200.834322  186.957721   
2024-06-25     0.446814  212.769363  210.752919  201.786671  187.611427   
2024-06-26     1.999330  213.617462  211.361545  202.947050  188.425467   
2024-06-27     0.398600  210.145279  211.464313  204.134867  189.322429   
2024-06-28    -1.625421  216.261475  211.103127  205.099188  190.177449   

Price             MA80       MA100       MA120  
Ticker                                          
Date                                            
2024-06-24  181.147667  181.759709  182.628841  
2024-06-25  181.503922  182.010686  182.827706  
2024-06-26  181.925886  182.278890  183.072853  
2024-06-27  182.415246  182.565625  183.344472  
2024-06-28  182.923228  182.799427  183.593210  
Training data shape: (83, 8)
Testing data shape: (21, 8)
Scaled training data:
            Daily Return    Target      MA10      MA20      MA50      MA80  \
Date                                                                         
2024-07-09      0.609413  0.872180  0.387638  0.437574  0.249596  0.130949   
2024-08-30      0.524789  0.535090  0.744674  0.702697  0.855276  0.691110   
2024-08-23      0.685831  0.684634  0.621646  0.627575  0.818148  0.618907   
2024-10-04      0.623874  0.498467  0.758662  0.799437  0.885246  0.920093   
2024-07-23      0.620130  0.383082  0.800906  0.759060  0.508349  0.289896   

               MA100     MA120  
Date                            
2024-07-09  0.074411  0.075035  
2024-08-30  0.503176  0.396925  
2024-08-23  0.434119  0.334180  
2024-10-04  0.786882  0.670078  
2024-07-23  0.182103  0.156660
```

---

Gemini

BUILDING THE GAN ARCHITECTURE

---

Gemini


  66
####BUILDING THE GAN ARCHITECTURE
#defining the generator step 1
#the 'generator' will take random noise as input and generate data which resembles the real, historical data
from tensorflow.keras import layers, models, optimizers
import numpy as np
import tensorflow as tf

def build_generator(latent_dim, output_dim): #dim- dimensions
    model = models.Sequential()
    model.add(layers.Dense(128, input_dim=latent_dim))
    model.add(layers.LeakyReLU(alpha=0.2))
    model.add(layers.Dense(256))
    model.add(layers.LeakyReLU(alpha=0.2))
    model.add(layers.Dense(512))
    model.add(layers.LeakyReLU(alpha=0.2))
    model.add(layers.Dense(output_dim, activation='relu'))  #consider and explore other activation fucntions based on use cases
    return model
#step 2; defining the discriminator
#the discriminator takes the data as input and outputs as a probablity indicating whether the data is real or synthetic
def build_discriminator(input_dim):
    model = models.Sequential()
    model.add(layers.Dense(512, input_dim=input_dim))
    model.add(layers.LeakyReLU(alpha=0.2))
    model.add(layers.Dropout(0.3))
    model.add(layers.Dense(256))
    model.add(layers.LeakyReLU(alpha=0.2))
    model.add(layers.Dropout(0.3))
    model.add(layers.Dense(128))
    model.add(layers.LeakyReLU(alpha=0.2))
    model.add(layers.Dropout(0.3))
    model.add(layers.Dense(1, activation='relu')) #ReLU - reactified linear unit: alternatively consider sigmoid as an activation function
    return model

#step 3 compiling
np.random.seed(678)
tf.random.set_seed(678) # setting random seed

latent_dim = 100  # Size of the noise vector - defining the dimensions
output_dim = train_scaled.shape[1]  #number of features

discriminator = build_discriminator(output_dim) # Build and compile the discriminator
if discriminator is None:
    raise ValueError("Discriminator model was NOT built correctly.")
discriminator.compile(loss='binary_crossentropy', #loss function as binary - binary classification - discriminator classfies outputs as real or fake
                      optimizer=optimizers.Adam(learning_rate=0.00001, beta_1=0.9), #adjust learning rate and beta as necessary,
                      metrics=['accuracy']) #higher beta_1 gives more weight to recent gradients, lower value gives more value to historical data

generator = build_generator(latent_dim, output_dim) # Build the generator
if generator is None:
    raise ValueError("Generator model was NOT built correctly.")

discriminator.trainable = False # Build the combined model - 'False' freezes the discriminator weights when training the generator
gan_input = layers.Input(shape=(latent_dim,))
generated_data = generator(gan_input)
gan_output = discriminator(generated_data)

gan = models.Model(gan_input, gan_output)
gan.compile(loss='binary_crossentropy',
            optimizer=optimizers.Adam(learning_rate=0.00001, beta_1=0.9)) #adjust as needed

print("Discriminator Summary:")
discriminator.summary()
print("\nGenerator Summary:")
generator.summary()
print("\nGAN Summary:")
gan.summary()
Start coding or generate with AI.
```

```
Discriminator Summary:
Model: "sequential_5"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 dense_16 (Dense)            (None, 512)               4608      
                                                                 
 leaky_re_lu_12 (LeakyReLU)  (None, 512)               0         
                                                                 
 dropout_6 (Dropout)         (None, 512)               0         
                                                                 
 dense_17 (Dense)            (None, 256)               131328    
                                                                 
 leaky_re_lu_13 (LeakyReLU)  (None, 256)               0         
                                                                 
 dropout_7 (Dropout)         (None, 256)               0         
                                                                 
 dense_18 (Dense)            (None, 128)               32896     
                                                                 
 leaky_re_lu_14 (LeakyReLU)  (None, 128)               0         
                                                                 
 dropout_8 (Dropout)         (None, 128)               0         
                                                                 
 dense_19 (Dense)            (None, 1)                 129       
                                                                 
=================================================================
Total params: 168961 (660.00 KB)
Trainable params: 0 (0.00 Byte)
Non-trainable params: 168961 (660.00 KB)
_________________________________________________________________

Generator Summary:
Model: "sequential_6"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 dense_20 (Dense)            (None, 128)               12928     
                                                                 
 leaky_re_lu_15 (LeakyReLU)  (None, 128)               0         
                                                                 
 dense_21 (Dense)            (None, 256)               33024     
                                                                 
 leaky_re_lu_16 (LeakyReLU)  (None, 256)               0         
                                                                 
 dense_22 (Dense)            (None, 512)               131584    
                                                                 
 leaky_re_lu_17 (LeakyReLU)  (None, 512)               0         
                                                                 
 dense_23 (Dense)            (None, 8)                 4104      
                                                                 
=================================================================
Total params: 181640 (709.53 KB)
Trainable params: 181640 (709.53 KB)
Non-trainable params: 0 (0.00 Byte)
_________________________________________________________________

GAN Summary:
Model: "model_1"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 input_2 (InputLayer)        [(None, 100)]             0         
                                                                 
 sequential_6 (Sequential)   (None, 8)                 181640    
                                                                 
 sequential_5 (Sequential)   (None, 1)                 168961    
                                                                 
=================================================================
Total params: 350601 (1.34 MB)
Trainable params: 181640 (709.53 KB)
Non-trainable params: 168961 (660.00 KB)
_________________________________________________________________
```

---

Gemini

TRAINING GAN Parameters

---

Gemini

```
1
   2
   3
   4
   5
   6
   7
   8
   9
  10
  11
  12
  13
  14
  15
  16
  17
  18
  19
  20
  21
  22
  23
  24
  25
  26
  27
#### TRAINING GAN Parameters
#training the parameters - adjust all as required
epochs = 10000
batch_size = 64
save_interval = 1000

real = np.ones((batch_size, 1))
fake = np.zeros((batch_size, 1))

scaler_relu = MinMaxScaler(feature_range=(-1,1))
train_scaled_relu = scaler_relu.fit_transform(train_data)
train_scaled_relu = pd.DataFrame(train_scaled_relu, columns=features, index=train_data.index)

output_dim = train_scaled_relu.shape[1]

generator = build_generator(latent_dim, output_dim)

from tensorflow.keras import optimizers
#rebuild discriminator
discriminator = build_discriminator(output_dim)
discriminator.compile(loss='binary_crossentropy',
                      optimizer=optimizers.Adam(learning_rate=0.00001, beta_1=0.9),
                      metrics=['accuracy'])
#recompilation
discriminator.trainable = False
gan = models.Sequential([generator, discriminator])
gan.compile(loss='binary_crossentropy', optimizer=optimizers.Adam(learning_rate=0.00001, beta_1=0.9))
Start coding or generate with AI.
```

---

Gemini

```
1
   2
   3
   4
   5
   6
   7
   8
   9
  10
  11
  12
  13
  14
  15
  16
  17
  18
  19
  20
  21
  22
  23
  24
  25
  26
  27
  28
  29
  30
  31
# Training loop
for epoch in range(1, epochs+1):
        #  Train Discriminator
        # Select a random batch of real samples
        idx = np.random.randint(0, train_scaled_relu.shape[0], batch_size) #pre-determined batch size = 64, can be inreased
        real_data = train_scaled_relu.iloc[idx].values

        noise = np.random.normal(0, 1, (batch_size, latent_dim))  # Generate a batch of fake samples - random noise sampled from a normal distribution
        generated_data = generator.predict(noise, verbose=0) #fake data that's produced by the generator when fed the noise input

        d_loss_real = discriminator.train_on_batch(real_data, real) # Train the discriminator on real and fake data
        d_loss_fake = discriminator.train_on_batch(generated_data, fake)
        d_loss = (np.add(d_loss_real, d_loss_fake))/2 #calculate average loss and accuracy
        # d_loss_real and d_loss_fake contain two components each:
          # Loss: How well the discriminator predicts real or fake correctly.
          # Accuracy: Percentage of correct predictions (real or fake).

        #  Train Generator
        noise = np.random.normal(0, 1, (batch_size, latent_dim)) # Generate noise for the generator
        g_loss = gan.train_on_batch(noise, real) # We want the discriminator to label generated (fake) data as real - generator's goal is to fool the discriminator into believing its fake data is real

        if epoch % 1000 == 0 or epoch == 1:
            print(f"Epoch {epoch} / {epochs} | D Loss: {d_loss[0]:.4f}, D Acc: {d_loss[1] * 100:.2f}% | G Loss: {g_loss:.4f}")  # printing progress - removed [0] from g_loss

        if epoch % save_interval == 0 or epoch == epochs:
                noise = np.random.normal(0, 1, (batch_size, latent_dim))
                generated_samples = generator.predict(noise, verbose=0)
                generated_samples = scaler_relu.inverse_transform(generated_samples) # Inverse transform to original scale
                generated_df = pd.DataFrame(generated_samples, columns=features) #converting generated samples into dataframe
                print(f"Synthetic Data Sample at Epoch {epoch}:") #printing sample data
                print(generated_df.head())
Start coding or generate with AI.
```

```
Epoch 1 / 10000 | D Loss: 5.4756, D Acc: 50.00% | G Loss: 12.8922
Epoch 1000 / 10000 | D Loss: 0.7445, D Acc: 53.12% | G Loss: 1.1704
Synthetic Data Sample at Epoch 1000:
   Daily Return      Target        MA10        MA20        MA50        MA80  \
0      0.300927  224.030685  225.821121  230.540787  226.581360  211.372070   
1      1.812495  225.974426  225.386612  229.023697  230.448730  211.900177   
2      4.641741  224.299210  225.219833  235.758453  228.665665  203.015442   
3      2.737932  224.005371  225.897568  230.660049  225.621597  207.525635   
4      1.453462  225.319244  221.880997  219.470810  218.888840  203.015442   

        MA100       MA120  
0  203.199707  201.925537  
1  203.199707  201.925537  
2  203.199707  209.124756  
3  203.199707  201.925537  
4  203.199707  201.925537  
Epoch 2000 / 10000 | D Loss: 0.7449, D Acc: 57.03% | G Loss: 2.2765
Synthetic Data Sample at Epoch 2000:
   Daily Return      Target        MA10        MA20        MA50        MA80  \
0      0.797709  237.310928  230.609360  238.493378  253.877594  237.625244   
1     -0.555073  241.225266  226.208115  236.253494  255.273407  230.365570   
2     -0.555073  239.030899  229.177399  231.051422  251.746552  233.690292   
3     -0.555073  242.372955  233.143982  233.058289  246.645477  232.848160   
4     -0.555073  232.704590  227.830841  238.632172  251.034256  228.968796   

        MA100       MA120  
0  203.199707  201.925537  
1  203.199707  201.925537  
2  203.199707  201.925537  
3  203.199707  201.925537  
4  203.199707  201.925537  
Epoch 3000 / 10000 | D Loss: 0.4794, D Acc: 69.53% | G Loss: 2.4615
Synthetic Data Sample at Epoch 3000:
   Daily Return      Target        MA10        MA20        MA50        MA80  \
0     -0.555073  226.388565  237.734436  232.490814  229.476547  213.999084   
1      1.624098  221.491531  239.961838  233.094742  222.613235  218.125992   
2      0.365362  222.963425  225.223816  224.603622  211.134750  212.564484   
3      0.295727  221.491531  234.037506  229.526764  214.882782  225.401718   
4     -0.555073  221.491531  236.154388  228.593185  223.279541  224.667923   

        MA100       MA120  
0  228.843292  201.925537  
1  230.821045  201.925537  
2  214.958939  201.925537  
3  235.215240  201.925537  
4  242.174042  201.925537  
Epoch 4000 / 10000 | D Loss: 0.7006, D Acc: 64.06% | G Loss: 1.4643
Synthetic Data Sample at Epoch 4000:
   Daily Return      Target        MA10        MA20        MA50        MA80  \
0      0.423339  234.433502  221.015640  225.389618  218.530182  213.975876   
1      1.580592  233.384857  224.892288  219.189026  219.181168  216.423462   
2      0.112791  235.730896  222.059113  227.609833  226.651978  236.120056   
3     -0.555073  240.116455  221.015640  231.325058  220.200562  216.929214   
4     -0.555073  244.388870  221.015640  235.341965  247.477676  236.895889   

        MA100       MA120  
0  215.195175  213.684753  
1  203.199707  213.017700  
2  214.390076  208.926056  
3  214.499252  219.305588  
4  223.360611  218.220871  
Epoch 5000 / 10000 | D Loss: 0.4555, D Acc: 78.12% | G Loss: 1.4400
Synthetic Data Sample at Epoch 5000:
   Daily Return      Target        MA10        MA20        MA50        MA80  \
0     -0.555073  222.007599  221.015640  225.246826  221.553604  225.284943   
1     -0.555073  224.608032  225.818344  230.289948  229.551788  228.607666   
2      1.224951  221.491531  224.712585  234.526978  234.666000  244.222870   
3     -0.555073  223.885345  224.956039  220.447250  213.934937  224.223053   
4      1.002196  221.491531  221.015640  221.400665  225.804916  235.317459   

        MA100       MA120  
0  210.546341  216.845703  
1  214.893555  221.936890  
2  208.342819  215.846695  
3  211.158081  212.073685  
4  219.478043  217.187363  
Epoch 6000 / 10000 | D Loss: 0.4634, D Acc: 75.78% | G Loss: 1.3337
Synthetic Data Sample at Epoch 6000:
   Daily Return      Target        MA10        MA20        MA50        MA80  \
0     -0.438455  223.813904  230.367081  221.756439  230.968262  224.996124   
1     -0.555073  234.939407  236.938293  228.998917  229.595932  216.074280   
2     -0.555073  229.631088  230.339645  231.666550  224.591522  211.875488   
3     -0.101488  228.843704  231.288940  236.469009  240.274490  229.166718   
4     -0.555073  226.227478  227.032303  219.473648  232.619766  222.648026   

        MA100       MA120  
0  215.488846  209.713501  
1  204.807953  205.603729  
2  219.767593  211.093246  
3  222.984390  213.650650  
4  223.348892  216.087997  
Epoch 7000 / 10000 | D Loss: 0.3951, D Acc: 82.03% | G Loss: 1.2929
Synthetic Data Sample at Epoch 7000:
   Daily Return      Target        MA10        MA20        MA50        MA80  \
0     -0.555073  222.302399  225.019806  228.053452  220.255844  228.683716   
1     -0.555073  225.429901  229.288071  242.433762  237.900238  235.013794   
2     -0.400919  224.211212  226.969055  231.588165  231.093536  237.305588   
3     -0.555073  235.459106  230.383224  227.786438  219.396927  236.920273   
4      0.364467  235.350876  231.862625  227.138687  220.200668  215.650421   

        MA100       MA120  
0  230.721649  212.411575  
1  229.765411  211.884415  
2  225.823563  208.946915  
3  225.185928  212.935638  
4  212.509872  211.157379  
Epoch 8000 / 10000 | D Loss: 0.4054, D Acc: 80.47% | G Loss: 1.3201
Synthetic Data Sample at Epoch 8000:
   Daily Return      Target        MA10        MA20        MA50        MA80  \
0      0.437472  222.862488  222.673431  223.180618  220.048309  214.362747   
1      0.213966  224.228882  225.321442  227.910828  221.386093  217.929749   
2     -0.555073  228.983292  226.834656  234.189819  218.423431  228.296921   
3     -0.555073  226.058212  221.015640  221.993225  214.177765  217.907135   
4     -0.555073  223.395859  225.953003  223.137238  215.727463  225.212158   

        MA100       MA120  
0  215.113388  209.067047  
1  212.576706  211.169556  
2  229.411362  224.663834  
3  216.226395  218.464890  
4  218.270126  211.267700  
Epoch 9000 / 10000 | D Loss: 0.4314, D Acc: 79.69% | G Loss: 1.4937
Synthetic Data Sample at Epoch 9000:
   Daily Return      Target        MA10        MA20        MA50        MA80  \
0     -0.373801  222.152466  222.010681  222.972137  224.551804  217.212067   
1     -0.555073  229.158691  227.670776  227.348145  221.314819  220.309189   
2      0.321130  229.597656  221.015640  225.292648  229.883514  213.521072   
3      1.650209  230.449310  227.909424  226.253525  222.491318  221.357864   
4      0.866607  223.799545  222.664368  227.336700  221.289841  213.702179   

        MA100       MA120  
0  216.593643  204.626175  
1  216.236542  220.031189  
2  212.158646  201.925537  
3  216.878876  213.973740  
4  213.983902  205.297424  
Epoch 10000 / 10000 | D Loss: 0.4155, D Acc: 80.47% | G Loss: 1.3440
Synthetic Data Sample at Epoch 10000:
   Daily Return      Target        MA10        MA20        MA50        MA80  \
0     -0.555073  227.400085  229.990250  231.998505  232.831146  225.211563   
1     -0.201686  224.619324  222.427002  227.497284  222.546295  220.034897   
2     -0.555073  227.832367  228.835922  228.479843  228.501938  223.336014   
3     -0.132068  229.730560  227.927765  230.235413  233.288818  220.932495   
4     -0.555073  221.491531  225.760635  225.965469  233.960617  215.009079   

        MA100       MA120  
0  223.988708  222.565308  
1  212.721558  204.813385  
2  215.325104  207.289886  
3  218.111877  210.450485  
4  214.325790  215.717468
```

---

Gemini

```
1
   2
   3
   4
   5
   6
   7
   8
   9
  10
  11
  12
  13
  14
  15
#### GENERATING THE SYNTHETIC DATA
# Function to generate synthetic data
def generate_synthetic_data(generator, scaler, num_samples):
    noise = np.random.normal(0, 1, (num_samples, latent_dim))
    generated_data = generator.predict(noise)
    # Inverse transform to original scale
    generated_data = scaler.inverse_transform(generated_data)
    synthetic_df = pd.DataFrame(generated_data, columns=features)
    return synthetic_df

# Generating synthetic data
synthetic_data = generate_synthetic_data(generator, scaler_relu, 100000) # Generate 100000 synthetic samples - adjust number as needed

print("Synthetic Data Samples:")
print(synthetic_data.head())
Start coding or generate with AI.
```

```
3125/3125 [==============================] - 5s 2ms/step
Synthetic Data Samples:
   Daily Return      Target        MA10        MA20        MA50        MA80  \
0     -0.555073  225.253571  228.211472  233.324585  224.703903  224.260803   
1      0.460629  221.491531  230.262375  227.000702  225.159561  222.358063   
2     -0.555073  227.864227  228.179276  227.527588  221.283844  217.587677   
3      0.336712  226.227905  225.091156  219.034042  216.282318  214.969574   
4     -0.555073  224.898224  226.612381  225.889359  223.154236  217.779297   

        MA100       MA120  
0  213.158157  203.735580  
1  220.683594  210.636612  
2  218.754227  216.948303  
3  213.596863  207.087921  
4  218.817230  214.346832
```

---

Gemini

```
1
   2
from IPython.display import display
display(synthetic_data)
Start coding or generate with AI.
```

---

Gemini

```
1
   2
   3
   4
   5
   6
   7
   8
   9
  10
# Statistical summary
real_stats = train_scaled_relu.describe()
synthetic_stats = scaler_relu.transform(synthetic_data)
synthetic_stats = pd.DataFrame(synthetic_stats, columns=features)

print("Real Data Statistics:")
print(real_stats)

print("\nSynthetic Data Statistics:")
print(synthetic_stats.describe())
Start coding or generate with AI.
```

```
Real Data Statistics:
       Daily Return     Target       MA10       MA20       MA50       MA80  \
count     83.000000  83.000000  83.000000  83.000000  83.000000  83.000000   
mean       0.147736   0.218260   0.229793   0.473319   0.494877   0.298927   
std        0.321850   0.421383   0.454511   0.402440   0.516424   0.625288   
min       -1.000000  -1.000000  -1.000000  -1.000000  -1.000000  -1.000000   
25%       -0.003503   0.002470   0.008722   0.283813   0.244128  -0.208367   
50%        0.172294   0.292632   0.321516   0.531799   0.737329   0.448896   
75%        0.314796   0.463761   0.502915   0.707552   0.815695   0.883009   
max        1.000000   1.000000   1.000000   1.000000   1.000000   1.000000   

           MA100      MA120  
count  83.000000  83.000000  
mean    0.080485  -0.051988  
std     0.639788   0.615456  
min    -1.000000  -1.000000  
25%    -0.476497  -0.583817  
50%     0.075275  -0.141469  
75%     0.669914   0.483734  
max     1.000000   1.000000  

Synthetic Data Statistics:
       Daily Return        Target          MA10          MA20          MA50  \
count  1.000000e+05  1.000000e+05  1.000000e+05  1.000000e+05  1.000000e+05   
mean   1.212215e-01  4.372979e-01  4.917730e-01  7.428116e-01  8.420885e-01   
std    1.823664e-01  2.625284e-01  2.814346e-01  2.525702e-01  2.362031e-01   
min   -4.919832e-09  3.062386e-07 -8.694138e-07  1.314876e-07 -5.716868e-08   
25%   -4.919832e-09  2.447310e-01  2.881342e-01  5.669161e-01  6.779279e-01   
50%   -4.919832e-09  4.224389e-01  4.820891e-01  7.294422e-01  8.308272e-01   
75%    2.006224e-01  6.081367e-01  6.825519e-01  9.044234e-01  9.946167e-01   
max    1.387696e+00  2.000179e+00  1.834380e+00  2.120802e+00  2.069689e+00   

               MA80         MA100         MA120  
count  1.000000e+05  1.000000e+05  1.000000e+05  
mean   8.483974e-01  6.639555e-01  4.947809e-01  
std    2.819230e-01  3.038520e-01  3.602992e-01  
min   -3.157802e-07 -1.776091e-07 -3.876443e-07  
25%    6.523783e-01  4.536901e-01  2.021655e-01  
50%    8.351762e-01  6.576741e-01  4.713856e-01  
75%    1.031090e+00  8.651929e-01  7.387958e-01  
max    2.479958e+00  2.293496e+00  2.238067e+00
```

---

Gemini

Visualisation of Data

---

Gemini

```
1
    2
    3
    4
    5
    6
    7
    8
    9
   10
   11
   12
   13
   14
   15
   16
   17
   18
   19
   20
   21
   22
   23
   24
   25
   26
   27
   28
   29
   30
   31
   32
   33
   34
   35
   36
   37
   38
   39
   40
   41
   42
   43
   44
   45
   46
   47
   48
   49
   50
   51
   52
   53
   54
   55
   56
   57
   58
   59
   60
   61
   62
   63
   64
   65
   66
   67
   68
   69
   70
   71
   72
   73
   74
   75
   76
   77
   78
   79
   80
   81
   82
   83
   84
   85
   86
   87
   88
   89
   90
   91
   92
   93
   94
   95
   96
   97
   98
   99
  100
  101
  102
  103
  104
  105
  106
  107
  108
  109
  110
  111
  112
  113
  114
  115
  116
  117
  118
  119
  120
  121
  122
  123
  124
  125
  126
  127
  128
  129
  130
  131
  132
  133
  134
  135
  136
  137
  138
  139
  140
  141
  142
  143
  144
  145
  146
  147
  148
  149
  150
  151
  152
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import entropy
import numpy as np
import pandas as pd

# Number of features
num_features = len(features)
plt.figure(figsize=(10, 15))

for i, feature in enumerate(features):
    # Calculate KL divergence for the features
    real_density, real_bins = np.histogram(train_scaled_relu[feature], bins=50, density=True)
    synthetic_density, _ = np.histogram(synthetic_data[feature], bins=real_bins, density=True)
    kl_divergence = entropy(real_density + 1e-10, synthetic_density + 1e-10)  # Add small epsilon to avoid division by zero

    plt.subplot(num_features, 1, i + 1)
    sns.kdeplot(train_scaled_relu[feature], label='Real', shade=True)
    sns.kdeplot(synthetic_data[feature], label='Synthetic', shade=True)
    plt.title(f'Distribution of {feature} (KL Divergence: {kl_divergence:.4f})')
    plt.legend()

plt.tight_layout()
plt.show()

# Split the real and synthetic KDE plots into side-by-side subplots for clearer visual comparison
plt.figure(figsize=(10, 15))
for i, feature in enumerate(features):
    plt.subplot(num_features, 2, i * 2 + 1)
    sns.kdeplot(train_scaled_relu[feature], label='Real', shade=True, color='blue')
    plt.title(f'Real Data Distribution of {feature}')
    plt.legend()

    plt.subplot(num_features, 2, i * 2 + 2)
    sns.kdeplot(synthetic_data[feature], label='Synthetic', shade=True, color='orange')
    plt.title(f'Synthetic Data Distribution of {feature}')
    plt.legend()

plt.tight_layout()
plt.show()

# CORRELATION ANALYSIS
# Correlation matrices
real_corr = train_scaled_relu.corr()
synthetic_corr = synthetic_data.corr()

# Plot correlation matrices side by side
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
sns.heatmap(real_corr, annot=True, cmap='coolwarm', fmt=".2f")
plt.title('Real Data Correlation')

plt.subplot(1, 2, 2)
sns.heatmap(synthetic_corr, annot=True, cmap='coolwarm', fmt=".2f")
plt.title('Synthetic Data Correlation')

plt.tight_layout()
plt.show()

# Difference in correlation matrices
corr_diff = real_corr - synthetic_corr

plt.figure(figsize=(18, 6))

plt.subplot(1, 3, 1)
sns.heatmap(real_corr, annot=True, cmap='coolwarm', cbar=False, fmt=".2f")
plt.title('Real Data Correlation')

plt.subplot(1, 3, 2)
sns.heatmap(synthetic_corr, annot=True, cmap='coolwarm', cbar=False, fmt=".2f")
plt.title('Synthetic Data Correlation')

plt.subplot(1, 3, 3)
sns.heatmap(corr_diff, annot=True, cmap='coolwarm', cbar=True, fmt=".2f")
plt.title('Correlation Difference (Real - Synthetic)')

plt.tight_layout()
plt.show()

# Assuming \`d_loss\` and \`discriminator_loss\` are recorded lists during training
epochs = range(1, len(d_loss) + 1)

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(epochs, d_loss, label='Discriminator Accuracy', color='blue')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.title('Discriminator Accuracy Over Epochs')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(epochs, d_loss, label='Discriminator Loss', color='red')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.title('Discriminator Loss Over Epochs')
plt.legend()

plt.tight_layout()
plt.show()

# Calculate mean and std for real and synthetic data
real_stats = train_scaled_relu.describe().loc[['mean', 'std']].T
synthetic_stats = synthetic_data.describe().loc[['mean', 'std']].T

# Plot side-by-side bar charts
plt.figure(figsize=(15, 5))
x = np.arange(len(features))

# Means
plt.subplot(1, 2, 1)
plt.bar(x - 0.2, real_stats['mean'], 0.4, label='Real', color='blue')
plt.bar(x + 0.2, synthetic_stats['mean'], 0.4, label='Synthetic', color='orange')
plt.xticks(x, features, rotation=90)
plt.ylabel('Mean')
plt.title('Feature Means')
plt.legend()

# Standard Deviations
plt.subplot(1, 2, 2)
plt.bar(x - 0.2, real_stats['std'], 0.4, label='Real', color='blue')
plt.bar(x + 0.2, synthetic_stats['std'], 0.4, label='Synthetic', color='orange')
plt.xticks(x, features, rotation=90)
plt.ylabel('Standard Deviation')
plt.title('Feature Standard Deviations')
plt.legend()

plt.tight_layout()
plt.show()

# Calculate metrics for each feature
metrics = []
for feature in features:
    real_mean = train_scaled_relu[feature].mean()
    synthetic_mean = synthetic_data[feature].mean()
    real_std = train_scaled_relu[feature].std()
    synthetic_std = synthetic_data[feature].std()

    # Calculate KL Divergence
    real_density, real_bins = np.histogram(train_scaled_relu[feature], bins=50, density=True)
    synthetic_density, _ = np.histogram(synthetic_data[feature], bins=real_bins, density=True)
    kl_divergence = entropy(real_density + 1e-10, synthetic_density + 1e-10)  # Add epsilon to avoid NaNs

    metrics.append([feature, real_mean, synthetic_mean, real_std, synthetic_std, kl_divergence])

# Convert metrics to DataFrame
metrics_df = pd.DataFrame(metrics, columns=['Feature', 'Real Mean', 'Synthetic Mean', 'Real Std', 'Synthetic Std', 'KL Divergence'])
display(metrics_df)

Start coding or generate with AI.
```

---

Gemini

Visualisation of data

---

Gemini

```
1
   2
   3
   4
   5
   6
   7
   8
   9
  10
  11
  12
  13
  14
  15
#### SAVING THE TRAINED GAN MODELS
# Save generator and discriminator models
generator.save('generator_model.h5')
discriminator.save('discriminator_model.h5')

#To reload the models
from tensorflow.keras.models import load_model
generator = load_model('generator_model.h5')
discriminator = load_model('discriminator_model.h5')

#### INCOPORATING MONITORING TOOLS
from tensorflow.keras.callbacks import TensorBoard

# Define TensorBoard callback
tensorboard = TensorBoard(log_dir='./logs', histogram_freq=1, write_graph=True, write_images=True)
Start coding or generate with AI.
```

---

Gemini

Model Performance Evaluation

---

Gemini

```
1
   2
   3
   4
   5
   6
   7
   8
   9
  10
  11
  12
  13
  14
  15
  16
  17
  18
  19
  20
  21
  22
  23
  24
  25
#### EVALUATION OF MODEL PERFORMANCE - final step before further parameter tuning and model reruns
from sklearn.decomposition import PCA

# Combine real and synthetic data
combined_data = pd.concat([train_scaled_relu.sample(1000, random_state=678),
                           scaler_relu.transform(synthetic_data).tolist()], axis=0)
labels = ['Real'] * 1000 + ['Synthetic'] * len(synthetic_data)

# Apply PCA
pca = PCA(n_components=2)
pca_result = pca.fit_transform(combined_data)

# Create a DataFrame for plotting
pca_df = pd.DataFrame(pca_result, columns=['PC1', 'PC2'])
pca_df['Type'] = labels

# Plot
plt.figure(figsize=(10, 7))
sns.scatterplot(x='PC1', y='PC2', hue='Type', data=pca_df, alpha=0.5)
plt.title('PCA of Real vs Synthetic Data')
plt.show()

#Interpretation:
#   •   Overlap: Greater overlap indicates that the synthetic data resembles the real data.
#   •   Separation: Minimal separation suggests good similarity between real and synthetic data.
Start coding or generate with AI.
```

---

Gemini

Hyperparameter Tuning: Experiment with different hyperparameters to improve GAN performance: • Learning Rates: Adjust the learning rates for the generator and discriminator. • Batch Size: Larger or smaller batch sizes can impact training stability. • Architecture Depth: Add or remove layers and neurons in the generator and discriminator. • Activation Functions: Experiment with different activation functions.

Advanced GAN Architectures: Consider advanced GAN variants for better performance on tabular data: • Conditional GANs (cGANs): Incorporate additional information or conditions. • Wasserstein GANs (WGANs): Improve training stability. • Tabular GANs (e.g., CTGAN, TGAN): Specifically designed for tabular data.

Handling Categorical Features: if you there are categorical features in the future models/runs, ensure proper encoding (e.g., one-hot encoding) before feeding them into the GAN.

Evaluating model performance: • Visual Inspection: Plot feature distributions and correlations as shown earlier. • Downstream Tasks: Use the synthetic data to train machine learning models and evaluate performance compared to models trained on real data. • Dimensionality Reduction: Use PCA or t-SNE to visualize real and synthetic data in lower dimensions.

---

Gemini

```
1
   2
   3
   4
   5
   6
   7
   8
   9
  10
  11
  12
  13
  14
  15
  16
  17
  18
  19
  20
  21
  22
  23
  24
  25
#### EVALUATION OF MODEL PERFORMANCE - final step before further parameter tuning and reruns
from sklearn.decomposition import PCA

# Combine real and synthetic data
combined_data = pd.concat([train_scaled_relu.sample(1000, random_state=678),  #use a standardised random state to replicatae results
                           scaler_relu.transform(synthetic_data).tolist()], axis=0)
labels = ['Real'] * 1000 + ['Synthetic'] * len(synthetic_data)

# Apply PCA
pca = PCA(n_components=2)
pca_result = pca.fit_transform(combined_data)

# Create a DataFrame for plotting
pca_df = pd.DataFrame(pca_result, columns=['PC1', 'PC2'])
pca_df['Type'] = labels

# Plot
plt.figure(figsize=(10, 7))
sns.scatterplot(x='PC1', y='PC2', hue='Type', data=pca_df, alpha=0.5)
plt.title('PCA of Real vs Synthetic Data')
plt.show()

#Interpretation:
#   •   Overlap: Greater overlap indicates that the synthetic data resembles the real data.
#   •   Separation: Minimal separation suggests good similarity between real and synthetic data.
Start coding or generate with AI.
```

---

Gemini

```
1
    2
    3
    4
    5
    6
    7
    8
    9
   10
   11
   12
   13
   14
   15
   16
   17
   18
   19
   20
   21
   22
   23
   24
   25
   26
   27
   28
   29
   30
   31
   32
   33
   34
   35
   36
   37
   38
   39
   40
   41
   42
   43
   44
   45
   46
   47
   48
   49
   50
   51
   52
   53
   54
   55
   56
   57
   58
   59
   60
   61
   62
   63
   64
   65
   66
   67
   68
   69
   70
   71
   72
   73
   74
   75
   76
   77
   78
   79
   80
   81
   82
   83
   84
   85
   86
   87
   88
   89
   90
   91
   92
   93
   94
   95
   96
   97
   98
   99
  100
  101
  102
  103
  104
  105
  106
  107
  108
  109
  110
  111
  112
  113
  114
  115
  116
  117
  118
  119
  120
  121
  122
import tensorflow as tf
from tensorflow.keras import layers

# Generator Model
def build_generator(seq_length, features):
    model = tf.keras.Sequential([
        layers.Input(shape=(seq_length, features)),
        layers.LSTM(128, return_sequences=True),
        layers.LSTM(64),
        layers.Dense(seq_length * features),
        layers.Reshape((seq_length, features)),
    ])
    return model

# Discriminator Model
def build_discriminator(seq_length, features):
    model = tf.keras.Sequential([
        layers.Input(shape=(seq_length, features)),
        layers.LSTM(64, return_sequences=True),
        layers.LSTM(32),
        layers.Dense(1, activation='sigmoid'), #0-1 range, commonly used as an activation function in ML
    ])
    return model

# Hyperparameters
seq_length = 50
features = normalized_data.shape[1]

# Initialize models
generator = build_generator(seq_length, features)
discriminator = build_discriminator(seq_length, features)

# Discriminator
discriminator.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# GAN Model (Combining Generator + Discriminator)
discriminator.trainable = False
gan_input = tf.keras.Input(shape=(seq_length, features))
generated_data = generator(gan_input)
gan_output = discriminator(generated_data)
gan = tf.keras.Model(gan_input, gan_output)
gan.compile(optimizer='adam', loss='binary_crossentropy')

import tensorflow as tf
from tensorflow.keras import layers

# GAN Generator
def build_generator(seq_length, features):
    model = tf.keras.Sequential([
        layers.Input(shape=(seq_length, features)),
        layers.LSTM(128, return_sequences=True),
        layers.LSTM(64),
        layers.Dense(seq_length * features),
        layers.Reshape((seq_length, features)),
    ])
    return model

# GAN Discriminator
def build_discriminator(seq_length, features):
    model = tf.keras.Sequential([
        layers.Input(shape=(seq_length, features)),
        layers.LSTM(64, return_sequences=True),
        layers.LSTM(32),
        layers.Dense(1, activation='sigmoid'),
    ])
    return model

# Hyperparameters
seq_length = 50  # Number of time steps in each sequence
features = normalized_data.shape[1]

# Build GAN models
generator = build_generator(seq_length, features)
discriminator = build_discriminator(seq_length, features)

# Compile discriminator
discriminator.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# GAN combining generator and discriminator
discriminator.trainable = False
gan_input = tf.keras.Input(shape=(seq_length, features))
generated_data = generator(gan_input)
gan_output = discriminator(generated_data)
gan = tf.keras.Model(gan_input, gan_output)
gan.compile(optimizer='adam', loss='binary_crossentropy')

# Prepare training sequences
def create_sequences(data, seq_length):
    sequences = []
    for i in range(len(data) - seq_length):
        sequences.append(data[i:i + seq_length])
    return np.array(sequences)

sequences = create_sequences(normalized_data, seq_length)

# Training loop
epochs = 1000
batch_size = 64

for epoch in range(epochs):
    # Sample real data
    idx = np.random.randint(0, sequences.shape[0], batch_size)
    real_data = sequences[idx]

    # Generate synthetic data
    noise = np.random.normal(0, 1, (batch_size, seq_length, features))
    synthetic_data = generator.predict(noise)

    # Train discriminator
    real_labels = np.ones((batch_size, 1))
    fake_labels = np.zeros((batch_size, 1))
    d_loss_real = discriminator.train_on_batch(real_data, real_labels)
    d_loss_fake = discriminator.train_on_batch(synthetic_data, fake_labels)
    d_loss = 0.5 * np.add(d_loss_real, d_loss_fake)

    # Train generator
    g_loss = gan.train_on_batch(noise, real_labels)

    # Print progress
    if epoch % 100 == 0:
        print(f"Epoch {epoch}, D Loss: {d_loss}, G Loss: {g_loss}")
Start coding or generate with AI.
```

---

Gemini

```
1
   2
   3
   4
   5
   6
   7
   8
   9
  10
  11
  12
  13
  14
  15
  16
  17
  18
  19
  20
  21
# LSTM Model for forecasting
def build_lstm_model(input_shape):
    model = tf.keras.Sequential([
        layers.LSTM(128, return_sequences=True, input_shape=input_shape),
        layers.LSTM(64),
        layers.Dense(1)
    ])
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

# Prepare LSTM data
X = sequences[:, :-1]
y = sequences[:, -1, 0]  # Predict the next 'Adj Close'

# Train LSTM
lstm_model = build_lstm_model((seq_length - 1, features))
lstm_model.fit(X, y, epochs=1000, batch_size=64)

# Forecast with LSTM
lstm_forecast = lstm_model.predict(X[-10:])
print("LSTM Forecast:", scaler.inverse_transform(lstm_forecast))
Start coding or generate with AI.
```

---

Gemini

```
1
   2
   3
   4
   5
from sklearn.metrics import mean_squared_error
rmse = np.sqrt(mean_squared_error(real_values, predicted_values))
print("RMSE:", rmse)
mape = np.mean(np.abs((real_values - predicted_values) / real_values)) * 100
print("MAPE:", mape)
Start coding or generate with AI.
```
